import knex from "../static/knex";
import toSQL from "./toSQL";

function createUsersPoll(poll: Poll) {
  var polldata = poll;
  var pros: Array<Promise<any>> = [];
  delete polldata.touserCodes;
  poll.touserCodes?.forEach((ele) => {
    polldata.touserCode = ele;
    pros.push(createPoll(polldata));
  });
  return pros;
}

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

export default createUsersPoll;
