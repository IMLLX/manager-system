"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("../static/config"));
var pool = mysql_1.default.createPool(config_1.default);
function toSQL(sqlQuery) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(sqlQuery, function (err, result) {
                if (err)
                    reject(err);
                connection.release();
                resolve(result);
            });
        });
    });
}
exports.default = toSQL;
