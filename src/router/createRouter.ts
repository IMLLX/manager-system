import express from "express";
import Boom from "@hapi/boom";
import createEvent from "../public/JavaScripts/function/create";
import createClass from "../public/JavaScripts/function/createClass";
import createEventSchema from "../public/Json/createEvent.Schema.json";
import createClassSchema from "../public/Json/createClass.Schema.json";
import Ajv from "ajv";

var router = express.Router();

router.post("/event", function (req, res) {
  var ajv = new Ajv();
  var validfunc = ajv.compile(createEventSchema);
  var valid = validfunc(req.body);
  if (!valid) {
    res.json({
      message: "请求格式错误",
      statusCode: 400,
      error_message: validfunc.errors,
    });
  } else {
    var event: Event = req.body || req.query;
    createEvent(event)
      .catch((err) => {
        var b = Boom.badRequest(err);
        res.json(b.output.payload);
      })
      .then((event) => {
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
  var ajv = new Ajv();
  var validfunc = ajv.compile(createClassSchema);
  var valid = validfunc(req.body);
  if (!valid) {
    res.json({
      message: "请求格式错误",
      statusCode: 400,
      error_message: validfunc.errors,
    });
  } else {
    var classname = req.body.classname || req.query.classname;
    createClass(classname)
      .catch((reason) => {
        var b = Boom.badRequest(reason);
        res.json(b.output.payload);
      })
      .then((result) => {
        if (result) {
          res.json({
            statusCode: 200,
            success: true,
            result: result,
          });
        }
      });
  }
});

export default router;
