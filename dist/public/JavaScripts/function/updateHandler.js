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
var selectEvent_1 = __importDefault(require("./selectEvent"));
var toSQL_1 = __importDefault(require("./toSQL"));
function successResult(result) {
    if (result.affectedRows) {
        return true;
    }
    else {
        return false;
    }
}
function updateHandler(param, eventId, status) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        selectEvent_1.default(eventId)
            .then(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _a, t, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = status;
                        switch (_a) {
                            case "receiveStatus": return [3 /*break*/, 1];
                            case "sendStatus": return [3 /*break*/, 2];
                            case "handleStatus": return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        if (event.receiveStatus === 1) {
                            reject("事件已接收,不可重复接收");
                        }
                        else if (param === 0) {
                            reject("不可撤回接收事件");
                        }
                        else {
                            t = knex_1.default("eventdata")
                                .update({
                                receiveStatus: param,
                                receiveTime: knex_1.default.raw("CURRENT_TIMESTAMP"),
                            })
                                .where({ Id: eventId })
                                .toQuery();
                            toSQL_1.default(t).then(function (result) {
                                if (successResult(result)) {
                                    selectEvent_1.default(eventId).then(function (event) {
                                        resolve(event);
                                    });
                                }
                                else {
                                    reject("未知错误");
                                }
                            });
                        }
                        return [3 /*break*/, 9];
                    case 2:
                        if (!(event.sendStatus == 1)) return [3 /*break*/, 3];
                        reject("事件已发送,不可重复发送");
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(param == 0)) return [3 /*break*/, 4];
                        reject("不可撤回事件");
                        return [3 /*break*/, 6];
                    case 4:
                        // 发送事件时更新执行编码
                        _b = event;
                        return [4 /*yield*/, getimpnum_1.default(event.eventClass, event.eventClassCode)];
                    case 5:
                        // 发送事件时更新执行编码
                        _b.impNumber = _c.sent();
                        t = knex_1.default("eventdata")
                            .update({
                            impNumber: event.impNumber,
                            sendStatus: param,
                            sendTime: knex_1.default.raw("CURRENT_TIMESTAMP"),
                        })
                            .where({ Id: eventId })
                            .toQuery();
                        toSQL_1.default(t).then(function (result) {
                            if (successResult(result)) {
                                selectEvent_1.default(eventId).then(function (event) {
                                    createPoll_1.default({
                                        impNumber: event.impNumber,
                                        touserCodes: event.touserCode,
                                        fromuserCode: event.fromuserCode,
                                        detail: event.detail_0,
                                        eventId: eventId,
                                        isReceived: false,
                                    });
                                    resolve(event);
                                });
                            }
                            else {
                                reject("未知错误");
                            }
                        });
                        _c.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        if (event.handleStatus == 1) {
                            reject("事件已处理,不可重复处理");
                        }
                        else if (param == 0) {
                            reject("不可撤回已处理事件");
                        }
                        else if (event.sendStatus == 0) {
                            reject("事件未接收,不可处理");
                        }
                        else {
                            t = knex_1.default("eventdata")
                                .update({
                                handleStatus: param,
                                processedTime: knex_1.default.raw("CURRENT_TIMESTAMP"),
                            })
                                .where({ Id: eventId })
                                .toQuery();
                            toSQL_1.default(t).then(function (result) {
                                if (successResult(result)) {
                                    selectEvent_1.default(eventId).then(function (event) {
                                        resolve(event);
                                    });
                                }
                                else {
                                    reject("未知错误");
                                }
                            });
                        }
                        return [3 /*break*/, 9];
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (reason) {
            reject(reason);
        });
    });
}
exports.default = updateHandler;
