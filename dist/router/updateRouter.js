"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("@hapi/boom"));
var express_1 = __importDefault(require("express"));
var updateHandler_1 = __importDefault(require("../public/JavaScripts/function/updateHandler"));
var router = express_1.default.Router();
function updateRespond(event) {
    var res = {
        statusCode: 200,
        success: true,
        data: event,
    };
    return res;
}
router.post("/receivestatus", function (req, res) {
    updateHandler_1.default(req.body.receiveStatus, req.body.Id, "receiveStatus")
        .catch(function (reason) {
        var b = boom_1.default.badRequest(reason);
        res.json(b.output.payload);
    })
        .then(function (event) {
        if (event)
            res.json(updateRespond(event));
    });
});
router.post("/sendstatus", function (req, res) {
    updateHandler_1.default(req.body.sendStatus, req.body.Id, "sendStatus")
        .catch(function (reason) {
        var b = boom_1.default.badRequest(reason);
        res.json(b.output.payload);
    })
        .then(function (event) {
        if (event)
            res.json(updateRespond(event));
    });
});
router.post("/handlestatus", function (req, res) {
    updateHandler_1.default(req.body.handleStatus, req.body.Id, "handleStatus")
        .catch(function (reason) {
        var b = boom_1.default.badRequest(reason);
        res.json(b.output.payload);
    })
        .then(function (event) {
        if (event)
            res.json(updateRespond(event));
    });
});
exports.default = router;
