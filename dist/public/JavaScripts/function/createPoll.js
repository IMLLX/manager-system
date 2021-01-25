"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("../static/knex"));
var toSQL_1 = __importDefault(require("./toSQL"));
function createUsersPoll(poll) {
    var _a;
    var polldata = poll;
    var pros = [];
    delete polldata.touserCodes;
    (_a = poll.touserCodes) === null || _a === void 0 ? void 0 : _a.forEach(function (ele) {
        polldata.touserCode = ele;
        pros.push(createPoll(polldata));
    });
    return pros;
}
function createPoll(poll) {
    return new Promise(function (resolve, reject) {
        var t = knex_1.default("pollevent").insert(poll).toQuery();
        toSQL_1.default(t).then(function (result) {
            if (!result.warningCount) {
                resolve(1);
            }
            else {
                reject("未知错误,创建通知失败");
            }
        });
    });
}
exports.default = createUsersPoll;
