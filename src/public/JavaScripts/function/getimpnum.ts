import dayjs from "dayjs";
import knex from "../static/knex";
import toSQL from "./toSQL";
const zeroFill = require("zero-fill");

function selectCountValue(eventClass: String): Promise<Number> {
  return new Promise((resolve) => {
    var t = knex("eventdata")
      .count("*", { as: "CountResult" })
      .where({ eventClass: eventClass, sendStatus: 1 })
      .toQuery();
    toSQL(t).then((result: any) => {
      //   console.log(result[0].CountResult);
      resolve(result[0].CountResult);
    });
  });
}

function getImpnum(
  eventClass: String,
  eventClassCode: String
): Promise<String> {
  return new Promise((resolve) => {
    var impnum: String = dayjs().format("YYYYMMDD");
    selectCountValue(eventClass).then((res) => {
      impnum = `${eventClassCode}-${impnum}-${zeroFill(4, res)}`;
      resolve(impnum);
    });
  });
}

export default getImpnum;
