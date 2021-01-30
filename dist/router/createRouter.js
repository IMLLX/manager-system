"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var boom_1 = __importDefault(require("@hapi/boom"));
var create_1 = __importDefault(require("../public/JavaScripts/function/create"));
var createClass_1 = __importDefault(require("../public/JavaScripts/function/createClass"));
var createEvent_Schema_json_1 = __importDefault(require("../public/Json/createEvent.Schema.json"));
var createClass_Schema_json_1 = __importDefault(require("../public/Json/createClass.Schema.json"));
var ajv_1 = __importDefault(require("ajv"));
var diyCode_1 = __importDefault(require("../public/JavaScripts/function/diyCode"));
var router = express_1.default.Router();
router.post("/event", function (req, res) {
    var ajv = new ajv_1.default();
    var validfunc = ajv.compile(createEvent_Schema_json_1.default);
    var valid = validfunc(req.body);
    if (!valid) {
        res.json({
            message: "请求格式错误",
            statusCode: 400,
            error_message: validfunc.errors,
        });
    }
    else {
        var event = req.body || req.query;
        create_1.default(event)
            .catch(function (err) {
            var b = boom_1.default.badRequest(err);
            res.json(b.output.payload);
        })
            .then(function (event) {
            if (event)
                res.json({
                    statusCode: 200,
                    success: true,
                    data: event,
                });
        });
    }
});
router.post("/class", function (req, res) {
    var ajv = new ajv_1.default();
    var validfunc = ajv.compile(createClass_Schema_json_1.default);
    var valid = validfunc(req.body);
    if (!valid) {
        res.json({
            message: "请求格式错误",
            statusCode: 400,
            error_message: validfunc.errors,
        });
    }
    else {
        var classname = req.body.classname || req.query.classname;
        var code = req.body.code || "";
        if (!Object.keys(code).length) {
            // 未传入code 由系统生成
            createClass_1.default(classname)
                .catch(function (reason) {
                var b = boom_1.default.badRequest(reason);
                res.json(b.output.payload);
            })
                .then(function (result) {
                if (result) {
                    res.json({
                        statusCode: 200,
                        success: true,
                        result: result,
                    });
                }
            });
        }
        else {
            diyCode_1.default(req.body)
                .then(function (result) {
                res.json({
                    statusCode: 200,
                    success: true,
                    result: result,
                });
            })
                .catch(function (reason) {
                res.json(boom_1.default.badRequest(reason).output.payload);
            });
        }
    }
});
exports.default = router;
