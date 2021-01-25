"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("../static/knex"));
var toSQL_1 = __importDefault(require("./toSQL"));
function selectUser(userClientCode) {
    return new Promise(function (resolve, reject) {
        var t = knex_1.default("tool_user")
            .select("name", "username", "sex", "role", "user_code", "client_role", "role_type", "dept_code", "post_code")
            .where({ user_code: userClientCode })
            .toQuery();
        toSQL_1.default(t)
            .then(function (result) {
            if (result[0]) {
                result = result[0];
                resolve(result);
            }
            else {
                resolve({
                    message: "找不到用户 " + userClientCode.toString(),
                    error: true,
                    userCode: userClientCode,
                });
            }
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
exports.default = selectUser;
