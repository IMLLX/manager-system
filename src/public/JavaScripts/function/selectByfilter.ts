import knex from "../static/knex";
import selectEvent from "./selectEvent";
import toSQL from "./toSQL";

var patternDate = /\d{4}-\d{2}-\d{2}/;
var patternMonth = /\d{4}-\d{2}/;
var patternYear = /\d{4}/;

function handleTime(time: string, tar: string) {
  if (patternDate.test(time)) {
    // 有日期时间数据传入
    return `DATE_FORMAT(${tar},'%Y-%m-%d')="${time}"`;
  }
  if (patternMonth.test(time)) {
    // 有月传入
    return `DATE_FORMAT(${tar},'%Y-%m')="${time}" `;
  }
  if (patternYear.test(time)) {
    // 有年传入
    return `DATE_FORMAT(${tar},'%Y')="${time}" `;
  }
  return "1";
}

function selectByfilter(data: any) {
  return new Promise(async (resolve, reject) => {
    var k_count = knex("eventdata");
    var k_limit = knex("eventdata");
    // 创建时间选择器
    if (data.createTime) {
      k_count.where(knex.raw(handleTime(data.createTime, "createTime")));
      k_limit.where(knex.raw(handleTime(data.createTime, "createTime")));
      delete data.createTime;
    }
    // 处理时间选择器
    if (data.processedTime) {
      k_count.where(knex.raw(handleTime(data.processedTime, "processedTime")));
      k_limit.where(knex.raw(handleTime(data.processedTime, "processedTime")));
      delete data.processedTime;
    }
    // 分页
    if (data.pageSize) {
      var pageSize = data.pageSize || 10;
      var currPage = data.currPage || 1;
      delete data.pageSize;
      delete data.currPage;
      k_limit.limit(pageSize).offset((currPage - 1) * pageSize);
    }
    // 接收者特判
    // var toUser = data.toUser;
    var toUser: any = {};
    if (data.toUser) {
      // 如果传来了 toUser 则需要进行特判
      toUser = Object.assign({}, data.toUser);
      var ids = []; // 限制 id
      var k = knex("events").select("eventId").where(toUser).toQuery();
      var IdArray = await toSQL(k);
      if (IdArray[0]) {
        // 如果存在事件
        for (let index = 0; index < IdArray.length; index++) {
          const id = IdArray[index];
          ids.push(id.eventId);
        }
        k_count.whereIn("Id", ids);
        k_limit.whereIn("Id", ids);
      } else {
        reject({
          message: `无满足条件的事件`,
          type: "NoneEventError",
        });
      }
      delete data.toUser;
    }
    var fromUser = data.fromUser;
    // 发送者筛选
    if (data.fromUser) {
      var ids = []; // 限制 id
      var k = knex("eventdata").select("Id").where(fromUser).toQuery();
      var IdArray = await toSQL(k);
      if (IdArray[0]) {
        // 如果存在事件
        for (let index = 0; index < IdArray.length; index++) {
          const id = IdArray[index];
          ids.push(id.Id);
        }
        k_count.whereIn("Id", ids);
        k_limit.whereIn("Id", ids);
      } else {
        reject({
          message: `无满足条件的事件`,
          type: "NoneEventError",
        });
      }
      delete data.fromUser;
    }
    if (Object.keys(data).length) {
      // 总数
      k_count.where(data);
      k_limit.where(data);
    }
    k_count.count("*", { as: "CountResult" });
    k_limit.select("Id");
    var CountResult: any = await toSQL(k_count.toQuery());
    var eventIds: any = await toSQL(k_limit.toQuery());
    var pros: Array<Promise<Event>> = [];
    // 获取事件
    if (toUser.hasOwnProperty("touserCode")) {
      eventIds.forEach((element: any) => {
        pros.push(selectEvent(element.Id, toUser.touserCode));
      });
    } else {
      eventIds.forEach((element: any) => {
        pros.push(selectEvent(element.Id));
      });
    }
    Promise.all(pros).then((events) => {
      resolve({
        data: events,
        totalCount: CountResult[0].CountResult,
        pageSize: pageSize || "",
        currPage: currPage || "",
      });
    });
  });
}

export default selectByfilter;
