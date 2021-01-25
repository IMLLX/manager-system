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
var selectEvent_1 = __importDefault(require("./selectEvent"));
var toSQL_1 = __importDefault(require("./toSQL"));
var patternDate = /\d{4}-\d{2}-\d{2}/;
var patternMonth = /\d{4}-\d{2}/;
var patternYear = /\d{4}/;
function handleTime(time, tar) {
    if (patternDate.test(time)) {
        // 有日期时间数据传入
        return "DATE_FORMAT(" + tar + ",'%Y-%m-%d')=\"" + time + "\"";
    }
    if (patternMonth.test(time)) {
        // 有月传入
        return "DATE_FORMAT(" + tar + ",'%Y-%m')=\"" + time + "\" ";
    }
    if (patternYear.test(time)) {
        // 有年传入
        return "DATE_FORMAT(" + tar + ",'%Y')=\"" + time + "\" ";
    }
    return "1";
}
function selectByfilter(data) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var k_count, k_limit, pageSize, currPage, CountResult, eventIds, pros;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    k_count = knex_1.default("eventdata");
                    k_limit = knex_1.default("eventdata");
                    // 创建时间选择器
                    if (data.createTime) {
                        k_count.where(knex_1.default.raw(handleTime(data.createTime, "createTime")));
                        k_limit.where(knex_1.default.raw(handleTime(data.createTime, "createTime")));
                        delete data.createTime;
                    }
                    // 处理时间选择器
                    if (data.processedTime) {
                        k_count.where(knex_1.default.raw(handleTime(data.processedTime, "processedTime")));
                        k_limit.where(knex_1.default.raw(handleTime(data.processedTime, "processedTime")));
                        delete data.processedTime;
                    }
                    // 分页
                    if (data.pageSize) {
                        pageSize = data.pageSize || 10;
                        currPage = data.currPage || 1;
                        delete data.pageSize;
                        delete data.currPage;
                        k_limit.limit(pageSize).offset((currPage - 1) * pageSize);
                    }
                    if (data.touserCode) {
                    }
                    // 总数
                    k_count.count("*", { as: "CountResult" }).where(data);
                    k_limit.where(data).select("Id");
                    return [4 /*yield*/, toSQL_1.default(k_count.toQuery())];
                case 1:
                    CountResult = _a.sent();
                    return [4 /*yield*/, toSQL_1.default(k_limit.toQuery())];
                case 2:
                    eventIds = _a.sent();
                    pros = [];
                    eventIds.forEach(function (element) {
                        pros.push(selectEvent_1.default(element.Id));
                    });
                    Promise.all(pros).then(function (events) {
                        resolve({
                            data: events,
                            totalCount: CountResult[0].CountResult,
                            pageSize: pageSize || "",
                            currPage: currPage || "",
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.default = selectByfilter;
