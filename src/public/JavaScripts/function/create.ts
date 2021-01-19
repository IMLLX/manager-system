import knex from "../static/knex";
import createPoll from "./createPoll";
import getImpnum from "./getimpnum";
import selectClass from "./selectClass";
import selectEvent from "./selectEvent";
import selectUser from "./selectUser";
import toSQL from "./toSQL";

// function handleClass(eventclass: EventClss) {
//   return new Promise((resolve, reject) => {
//     var query = knex("eventinfo")
//       .select("code")
//       .where({
//         classname: eventclass.eventClass,
//       })
//       .toQuery();
//     toSQL(query)
//       .then((result: any) => {
//         if (result) {
//           resolve(1);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// }

function checkEvent(event: Event) {
  return new Promise(async (resolve, reject) => {
    var fromuser: any = await selectUser(event.fromuserCode);
    var touser: any = await selectUser(event.touserCode);
    var Class = await selectClass({
      classname: event.eventClass,
    }).catch((reason) => {
      reject(reason);
    });
    if (event.handleStatus === 1) {
      reject("不能创建已完成事件");
    } else if (fromuser.error || touser.error) {
      reject("未知的发/收事件者,创建事件失败");
    } else resolve(Class);
  });
}

// function handleEvent(eventId: Number) {
//   return new Promise((resolve, reject) => {
//     var t = knex("eventdata").select("*").where({ Id: eventId }).toQuery();
//     toSQL(t)
//       .then(async (result: any) => {
//         if (result) {
//           result = result[0];
//           result.fromUser = await selectUser(result.fromuserCode);
//           result.toUser = await selectUser(result.touserCode);
//           resolve(result);
//         } else {
//           reject({ message: "找不到事件", id: eventId });
//         }
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

function createEvent(event: Event) {
  return new Promise((resolve, reject) => {
    // handleClass({
    //   eventClass: event.eventClass,
    //   eventClassCode: event.eventClassCode,
    // }).then();
    checkEvent(event) // 创建事件前的检查
      .then(async (Class: any) => {
        if (event.sendStatus === 1) {
          // 若创建发送事件
          event.impNumber = await getImpnum(
            // event.eventClass,
            // event.eventClassCode
            Class.classname,
            Class.code
          );
        }
        event.eventClassCode = Class.code;
        var to = knex("eventdata").insert(event).toQuery();
        toSQL(to)
          .then((res: any) => {
            if (!res.warningCount) {
              var insertId = res.insertId;
              selectEvent(insertId).then((event) => {
                createPoll({
                  impNumber: event.impNumber,
                  touserCode: event.touserCode,
                  fromuserCode: event.fromuserCode,
                  detail: event.detail_0,
                  eventId: insertId,
                  isReceived: false,
                }).catch(() => {});
                resolve(event);
              });
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

export default createEvent;
