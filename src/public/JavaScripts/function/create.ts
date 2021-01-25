import { json } from "express";
import knex from "../static/knex";
import createUsersPoll from "./createPoll";
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

// 检查创建的事件是否合法
function checkEvent(event: Event) {
  return new Promise(async (resolve, reject) => {
    var fromuser: any = await selectUser(event.fromuserCode);
    // var touser: any = await selectUser(event.touserCode);
    var touser: any = [];
    for (let index = 0; index < event.touserCode.length; index++) {
      const touserCode = event.touserCode[index];
      touser.push(await selectUser(touserCode));
    }
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

function eventsAdder(insertId: number, touserCode: any) {
  touserCode = JSON.parse(touserCode);
  touserCode.forEach((code: any) => {
    var t = knex("events")
      .insert({ eventId: insertId, touserCode: code })
      .toQuery();
    toSQL(t);
  });
}

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
          event.impNumber = await getImpnum(Class.classname, Class.code);
        }
        event.eventClassCode = Class.code;
        event.touserCode = JSON.stringify(event.touserCode);
        var to = knex("eventdata").insert(event).toQuery();
        toSQL(to)
          .then((res: any) => {
            if (!res.warningCount) {
              var insertId = res.insertId;
              eventsAdder(insertId, event.touserCode);
              selectEvent(insertId).then((event) => {
                createUsersPoll({
                  impNumber: event.impNumber,
                  touserCodes: event.touserCode,
                  fromuserCode: event.fromuserCode,
                  detail: event.detail_0,
                  eventId: insertId,
                  isReceived: false,
                });
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
