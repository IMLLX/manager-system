"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var selectPoll_1 = __importDefault(require("../public/JavaScripts/function/selectPoll"));
var toSQL_1 = __importDefault(require("../public/JavaScripts/function/toSQL"));
var knex_1 = __importDefault(require("../public/JavaScripts/static/knex"));
var router = express_1.default.Router();
router.get("/active", function (req, res) {
    var touserCode = req.query.touserCode;
    selectPoll_1.default(touserCode)
        .catch(function (reason) {
        res.json({ message: reason, success: true, statusCode: 200 });
    })
        .then(function (polls) {
        if (polls) {
            res.json({
                statusCode: 200,
                success: true,
                data: polls,
            });
            polls.forEach(function (poll) {
                poll.isReceived = true;
                delete poll.fromUser;
                toSQL_1.default(knex_1.default("pollevent").update(poll).where({ Id: poll.Id }).toQuery());
            });
        }
    });
});
exports.default = router;
