import knex from "../static/knex";
import selectUser from "./selectUser";
import toSQL from "./toSQL";

function selectEvent(id: Number): Promise<Event> {
  return new Promise((resolve, reject) => {
    var t = knex("eventdata").select("*").where({ Id: id }).toQuery();
    toSQL(t)
      .then(async (event: any) => {
        if (event[0]) {
          event = event[0];
          event.fromUser = await selectUser(event.fromuserCode);
          event.toUser = await selectUser(event.touserCode);
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
