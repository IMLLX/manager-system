"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("@hapi/boom"));
var express_1 = __importDefault(require("express"));
var selectByfilter_1 = __importDefault(require("../public/JavaScripts/function/selectByfilter"));
var selectClass_1 = __importDefault(require("../public/JavaScripts/function/selectClass"));
var router = express_1.default.Router();
router.get("/event", function (req, res) {
    var data = req.query;
    selectByfilter_1.default(data).then(function (result) {
        res.json({
            success: true,
            results: result.data,
            page: {
                totalCount: result.totalCount.toString(),
                pageSize: result.pageSize,
                totalPage: result.pageSize
                    ? Math.ceil(result.totalCount / result.pageSize).toString()
                    : "",
                currPage: result.currPage.toString(),
            },
            statusCode: 200,
        });
    });
});
router.get("/class", function (req, res) {
    var filter = req.query;
    selectClass_1.default(filter)
        .then(function (result) {
        if (result) {
            res.json({
                statusCode: 200,
                success: true,
                result: result,
            });
        }
    })
        .catch(function (reason) {
        res.json(boom_1.default.badRequest(reason).output.payload);
    });
});
exports.default = router;
