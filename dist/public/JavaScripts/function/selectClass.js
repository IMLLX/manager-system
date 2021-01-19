"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("../static/knex"));
var toSQL_1 = __importDefault(require("./toSQL"));
function selectClass(data) {
    return new Promise(function (resolve, reject) {
        var t = knex_1.default("eventinfo").select("classname", "code").where(data).toQuery();
        toSQL_1.default(t).then(function (result) {
            if (result[0]) {
                resolve(result[0]);
            }
            else {
                reject("未知的事件类型");
            }
        });
    });
}
exports.default = selectClass;
