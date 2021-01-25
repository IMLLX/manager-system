import knex from "../static/knex";
import selectUser from "./selectUser";
import toSQL from "./toSQL";

function selectEvent(id: Number, touserCode?: Number): Promise<Event> {
  return new Promise((resolve, reject) => {
    var t = knex("eventdata").select("*").where({ Id: id }).toQuery();
    toSQL(t)
      .then(async (event: any) => {
        if (event[0]) {
          event = event[0];
          event.fromUser = await selectUser(event.fromuserCode);
          if (touserCode) {
            event.toUser = await selectUser(touserCode);
          } else {
            var toUser: Array<any> = [];
            var touserCodes: Array<any> = JSON.parse(event.touserCode);
            // 原始数据 挂载所有 toUser 用户
            for (let index = 0; index < touserCodes.length; index++) {
              const touserCode = touserCodes[index];
              toUser.push(await selectUser(touserCode));
            }
            event.toUser = toUser;
          }

          resolve(event);
        } else {
          reject("找不到事件 EventId: " + id.toString());
        }
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

export default selectEvent;
