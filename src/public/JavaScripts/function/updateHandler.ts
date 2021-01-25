import knex from "../static/knex";
import createUsersPoll from "./createPoll";
import getImpnum from "./getimpnum";
import selectEvent from "./selectEvent";
import toSQL from "./toSQL";

function successResult(result: any): Boolean {
  if (result.affectedRows) {
    return true;
  } else {
    return false;
  }
}

function updateHandler(
  param: Number,
  eventId: Number,
  status: String
): Promise<Event> {
  return new Promise((resolve, reject) => {
    selectEvent(eventId)
      .then(async (event) => {
        switch (status) {
          // 更新接收状态
          case "receiveStatus":
            if (event.receiveStatus === 1) {
              reject("事件已接收,不可重复接收");
            } else if (param === 0) {
              reject("不可撤回接收事件");
            } else {
              var t = knex("eventdata")
                .update({
                  receiveStatus: param,
                  receiveTime: knex.raw("CURRENT_TIMESTAMP"),
                })
                .where({ Id: eventId })
                .toQuery();
              toSQL(t).then((result) => {
                if (successResult(result)) {
                  selectEvent(eventId).then((event) => {
                    resolve(event);
                  });
                } else {
                  reject("未知错误");
                }
              });
            }
            break;
          // 更新发送状态
          case "sendStatus":
            if (event.sendStatus == 1) {
              reject("事件已发送,不可重复发送");
            } else if (param == 0) {
              reject("不可撤回事件");
            } else {
              // 发送事件时更新执行编码
              event.impNumber = await getImpnum(
                event.eventClass,
                event.eventClassCode
              );
              t = knex("eventdata")
                .update({
                  impNumber: event.impNumber,
                  sendStatus: param,
                  sendTime: knex.raw("CURRENT_TIMESTAMP"),
                })
                .where({ Id: eventId })
                .toQuery();
              toSQL(t).then((result) => {
                if (successResult(result)) {
                  selectEvent(eventId).then((event) => {
                    createUsersPoll({
                      impNumber: event.impNumber,
                      touserCodes: event.touserCode,
                      fromuserCode: event.fromuserCode,
                      detail: event.detail_0,
                      eventId: eventId,
                      isReceived: false,
                    });
                    resolve(event);
                  });
                } else {
                  reject("未知错误");
                }
              });
            }
            break;
          //更新处理状态
          case "handleStatus":
            if (event.handleStatus == 1) {
              reject("事件已处理,不可重复处理");
            } else if (param == 0) {
              reject("不可撤回已处理事件");
            } else if (event.sendStatus == 0) {
              reject("事件未接收,不可处理");
            } else {
              t = knex("eventdata")
                .update({
                  handleStatus: param,
                  processedTime: knex.raw("CURRENT_TIMESTAMP"),
                })
                .where({ Id: eventId })
                .toQuery();
              toSQL(t).then((result) => {
                if (successResult(result)) {
                  selectEvent(eventId).then((event) => {
                    resolve(event);
                  });
                } else {
                  reject("未知错误");
                }
              });
            }
            break;
          default:
            break;
        }
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
export default updateHandler;
