import knex from "../static/knex";
import selectClass from "./selectClass";
const zerofill = require("zero-fill");
import toSQL from "./toSQL";

function getClassCode() {
  return new Promise((resolve, reject) => {
    var t = knex("eventinfo").count("*", { as: "count" }).toQuery();
    toSQL(t).then((result) => {
      if (result) {
        var cout = (result[0].count + 1).toString(16);
        resolve(cout);
      }
    });
  });
}

function createClass(classname: string) {
  return new Promise((resolve, reject) => {
    selectClass({ classname: classname })
      .then((res: any) => {
        if (res) {
          reject("已经存在的事件类型");
        }
      })
      .catch((reason) => {
        if (reason === "未知的事件类型") {
          getClassCode().then((code) => {
            code = zerofill(2, code);
            var t = knex("eventinfo")
              .insert({
                classname: classname,
                code: code,
              })
              .toQuery();
            toSQL(t).then(async (result) => {
              console.log(result);
              if (!result.warningCount) {
                var Class = await selectClass({ classname: classname });
                resolve(Class);
              }
            });
          });
        }
      });
  });
}

export default createClass;
