import Boom from "@hapi/boom";
import express from "express";
import selectByfilter from "../public/JavaScripts/function/selectByfilter";
import selectClass from "../public/JavaScripts/function/selectClass";
import selectTooluser from "../public/JavaScripts/function/selectTooluser";
var router = express.Router();

router.get("/event", (req, res) => {
  var data = req.query;
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

export default router;
