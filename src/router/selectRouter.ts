import Boom from "@hapi/boom";
import express from "express";
import selectByfilter from "../public/JavaScripts/function/selectByfilter";
import selectClass from "../public/JavaScripts/function/selectClass";
import selectColumn from "../public/JavaScripts/function/selectColumn";
import selectRoleinfo from "../public/JavaScripts/function/selectRoleinfo";
import selectTooluser from "../public/JavaScripts/function/selectTooluser";
var router = express.Router();

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

router.post("/event", (req, res) => {
  var data = req.body;
  selectByfilter(data)
    .then((result: any) => {
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
    .catch((reason) => {
      if (reason.type === "NoneEventError") {
        res.json({
          success: true,
          message: reason.message,
          statusCode: 200,
        });
      } else {
        console.log(reason);
        res.json(Boom.badRequest(reason).output.payload);
      }
    });
});

router.get("/class", function (req, res) {
  var filter = req.query;
  selectClass(filter)
    .then((result) => {
      if (result) {
        res.json({
          statusCode: 200,
          success: true,
          result: result,
        });
      }
    })
    .catch((reason) => {
      res.json(Boom.badRequest(reason).output.payload);
    });
});

router.get("/user", function (req, res) {
  var f = req.query;
  selectTooluser(f)
    .then((result) => {
      if (result) {
        res.json({
          statusCode: 200,
          success: true,
          result: result,
        });
      }
    })
    .catch((reason) => {
      res.json(Boom.badRequest(reason).output.payload);
    });
});

router.get("/role_info", function (req, res) {
  var data = req.query;
  selectRoleinfo(data).then((result) => {
    res.json({
      result: result,
      success: true,
      statusCode: 200,
    });
  });
});

router.get("/column", function (req, res) {
  var name: any = req.query.name;
  selectColumn(name).then((result) => {
    res.json({
      result: result,
      success: true,
      statusCode: 200,
    });
  });
});

export default router;
