"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("@hapi/boom"));
var express_1 = __importDefault(require("express"));
var selectByfilter_1 = __importDefault(require("../public/JavaScripts/function/selectByfilter"));
var selectClass_1 = __importDefault(require("../public/JavaScripts/function/selectClass"));
var selectTooluser_1 = __importDefault(require("../public/JavaScripts/function/selectTooluser"));
var router = express_1.default.Router();
// function fieldhandler(f: any) {
//   var h: any = {};
//   if (f.role_name) {
//     // h.role_name = f.role_name;
//     Object.assign(h, f.role_name);
//     delete f.role_name;
//   }
//   if (f.dept_name) {
//     // h.dept_name = f.dept_name;
//     Object.assign(h, f.dept_name);
//     delete f.dept_name;
//   }
//   return h;
// }
// async function namehandler(data: any) {
//   var ht: any = {};
//   var hf: any = {};
//   if (data.toUser) {
//     ht = fieldhandler(data.toUser);
//   }
//   if (data.fromUser) {
//     hf = fieldhandler(data.fromUser);
//   }
//   if (Object.keys(hf).length) {
//     var fromRoleinfo = await selectRoleinfo(hf);
//     (data.fromUser.dept_code = fromRoleinfo.dept_code),
//       (data.fromUser.post_code = fromRoleinfo.post_code),
//       (data.fromUser.role_type = fromRoleinfo.role_type);
//   }
//   if (Object.keys(ht).length) {
//     var toRoleinfo = await selectRoleinfo(ht);
//     (data.toUser.dept_code = toRoleinfo.dept_code),
//       (data.toUser.post_code = toRoleinfo.post_code),
//       (data.toUser.role_type = toRoleinfo.role_type);
//   }
//   return data;
// }
router.post("/event", function (req, res) {
    var data = req.body;
    selectByfilter_1.default(data)
        .then(function (result) {
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
    })
        .catch(function (reason) {
        if (reason.type === "NoneEventError") {
            res.json({
                success: true,
                message: reason.message,
                statusCode: 200,
            });
        }
        else {
            console.log(reason);
            res.json(boom_1.default.badRequest(reason).output.payload);
        }
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
router.get("/user", function (req, res) {
    var f = req.query;
    selectTooluser_1.default(f)
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
