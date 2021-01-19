import knex from "../static/knex";
import selectUser from "./selectUser";
import toSQL from "./toSQL";

function selectPoll(touserCode: Number): Promise<any> {
  return new Promise((resolve, reject) => {
    var t = knex("pollevent")
      .select("*")
      .where({ touserCode: touserCode })
      .toQuery();
    toSQL(t).then(async (polls: Array<Poll>) => {
      if (polls[0]) {
        for (let index = 0; index < polls.length; index++) {
          var poll = polls[index];
          poll.fromUser = await selectUser(poll.fromuserCode);
        }
        resolve(polls);
      } else {
        reject("暂无通知");
      }
    });
  });
}

export default selectPoll;
