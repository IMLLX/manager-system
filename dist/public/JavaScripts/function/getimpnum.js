"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var knex_1 = __importDefault(require("../static/knex"));
var toSQL_1 = __importDefault(require("./toSQL"));
var zeroFill = require("zero-fill");
function selectCountValue(eventClass) {
    return new Promise(function (resolve) {
        var t = knex_1.default("eventdata")
            .count("*", { as: "CountResult" })
            .where({ eventClass: eventClass, sendStatus: 1 })
            .toQuery();
        toSQL_1.default(t).then(function (result) {
            //   console.log(result[0].CountResult);
            resolve(result[0].CountResult);
        });
    });
}
function getImpnum(eventClass, eventClassCode) {
    return new Promise(function (resolve) {
        var impnum = dayjs_1.default().format("YYYYMMDD");
        selectCountValue(eventClass).then(function (res) {
            impnum = eventClassCode + "-" + impnum + "-" + zeroFill(4, res);
            resolve(impnum);
        });
    });
}
exports.default = getImpnum;
