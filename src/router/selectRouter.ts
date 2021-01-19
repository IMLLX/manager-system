import Boom from "@hapi/boom";
import express from "express";
import selectByfilter from "../public/JavaScripts/function/selectByfilter";
import selectClass from "../public/JavaScripts/function/selectClass";
var router = express.Router();

router.get("/event", (req, res) => {
  var data = req.query;

  selectByfilter(data).then((result: any) => {
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

export default router;
