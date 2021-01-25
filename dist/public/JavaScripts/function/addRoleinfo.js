"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("../static/knex"));
var toSQL_1 = __importDefault(require("./toSQL"));
function addRoleinfo(deptcode, postcode, roletype) {
    return new Promise(function (resolve) {
        var t = knex_1.default("role_info")
            .select("role_name", "dept_name", "post_name1", "role_type", "dept_code", "post_code")
            .where({ dept_code: deptcode, post_code: postcode, role_type: roletype })
            .toQuery();
        toSQL_1.default(t).then(function (result) {
            if (result[0]) {
                resolve(result[0]);
            }
            else {
                resolve({
                    message: "找不到的岗位信息",
                    error_info: {
                        dept_code: deptcode,
                        post_code: postcode,
                        role_type: roletype,
                    },
                });
            }
        });
    });
}
exports.default = addRoleinfo;
