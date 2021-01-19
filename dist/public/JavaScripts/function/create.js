"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("../static/knex"));
var createPoll_1 = __importDefault(require("./createPoll"));
var getimpnum_1 = __importDefault(require("./getimpnum"));
var selectClass_1 = __importDefault(require("./selectClass"));
var selectEvent_1 = __importDefault(require("./selectEvent"));
var selectUser_1 = __importDefault(require("./selectUser"));
var toSQL_1 = __importDefault(require("./toSQL"));
// function handleClass(eventclass: EventClss) {
//   return new Promise((resolve, reject) => {
//     var query = knex("eventinfo")
//       .select("code")
//       .where({
//         classname: eventclass.eventClass,
//       })
//       .toQuery();
//     toSQL(query)
//       .then((result: any) => {
//         if (result) {
//           resolve(1);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// }
function checkEvent(event) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var fromuser, touser, Class;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, selectUser_1.default(event.fromuserCode)];
                case 1:
                    fromuser = _a.sent();
                    return [4 /*yield*/, selectUser_1.default(event.touserCode)];
                case 2:
                    touser = _a.sent();
                    return [4 /*yield*/, selectClass_1.default({
                            classname: event.eventClass,
                        }).catch(function (reason) {
                            reject(reason);
                        })];
                case 3:
                    Class = _a.sent();
                    if (event.handleStatus === 1) {
                        reject("不能创建已完成事件");
                    }
                    else if (fromuser.error || touser.error) {
                        reject("未知的发/收事件者,创建事件失败");
                    }
                    else
                        resolve(Class);
                    return [2 /*return*/];
            }
        });
    }); });
}
// function handleEvent(eventId: Number) {
//   return new Promise((resolve, reject) => {
//     var t = knex("eventdata").select("*").where({ Id: eventId }).toQuery();
//     toSQL(t)
//       .then(async (result: any) => {
//         if (result) {
//           result = result[0];
//           result.fromUser = await selectUser(result.fromuserCode);
//           result.toUser = await selectUser(result.touserCode);
//           resolve(result);
//         } else {
//           reject({ message: "找不到事件", id: eventId });
//         }
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }
function createEvent(event) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        // handleClass({
        //   eventClass: event.eventClass,
        //   eventClassCode: event.eventClassCode,
        // }).then();
        checkEvent(event) // 创建事件前的检查
            .then(function (Class) { return __awaiter(_this, void 0, void 0, function () {
            var _a, to;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(event.sendStatus === 1)) return [3 /*break*/, 2];
                        // 若创建发送事件
                        _a = event;
                        return [4 /*yield*/, getimpnum_1.default(
                            // event.eventClass,
                            // event.eventClassCode
                            Class.classname, Class.code)];
                    case 1:
                        // 若创建发送事件
                        _a.impNumber = _b.sent();
                        _b.label = 2;
                    case 2:
                        event.eventClassCode = Class.code;
                        to = knex_1.default("eventdata").insert(event).toQuery();
                        toSQL_1.default(to)
                            .then(function (res) {
                            if (!res.warningCount) {
                                var insertId = res.insertId;
                                selectEvent_1.default(insertId).then(function (event) {
                                    createPoll_1.default({
                                        impNumber: event.impNumber,
                                        touserCode: event.touserCode,
                                        fromuserCode: event.fromuserCode,
                                        detail: event.detail_0,
                                        eventId: insertId,
                                        isReceived: false,
                                    }).catch(function () { });
                                    resolve(event);
                                });
                            }
                        })
                            .catch(function (reason) {
                            reject(reason);
                        });
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (reason) {
            reject(reason);
        });
    });
}
exports.default = createEvent;
