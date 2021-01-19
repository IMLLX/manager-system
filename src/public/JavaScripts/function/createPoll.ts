import knex from "../static/knex";
import toSQL from "./toSQL";

function createPoll(poll: Poll) {
  return new Promise((resolve, reject) => {
    var t = knex("pollevent").insert(poll).toQuery();
    toSQL(t).then((result: any) => {
      if (!result.warningCount) {
        resolve(1);
      } else {
        reject("未知错误,创建通知失败");
      }
    });
  });
}

export default createPoll;
