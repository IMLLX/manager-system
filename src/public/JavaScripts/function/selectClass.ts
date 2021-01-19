import knex from "../static/knex";
import toSQL from "./toSQL";

function selectClass(data: any): Promise<EventClss> {
  return new Promise((resolve, reject) => {
    var t = knex("eventinfo").select("classname", "code").where(data).toQuery();
    toSQL(t).then((result) => {
      if (result[0]) {
        resolve(result[0]);
      } else {
        reject("未知的事件类型");
      }
    });
  });
}

export default selectClass;
