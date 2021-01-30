import knex from "../static/knex";
import selectClass from "./selectClass";
import toSQL from "./toSQL";

function diyCode(data: any) {
  //   if (( selectClass({ classname: data.classname }))[0]) {
  //     return "已经存在的事件名称";
  //   }
  //   var t = knex("eventinfo").insert(data).toQuery();
  //   return await toSQL(t);
  return new Promise((resolve, reject) => {
    selectClass({ classname: data.classname })
      .catch((reason) => {})
      .then((result: any) => {
        if (result) {
          reject("已经存在的事件");
        } else {
          var t = knex("eventinfo").insert(data).toQuery();
          toSQL(t).then(async (result) => {
            if (result.insertId) {
              var r = (await selectClass({ id: result.insertId }))[0];
              resolve(r);
            }
          });
        }
      });
  });
}
export default diyCode;
