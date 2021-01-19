import Boom from "@hapi/boom";
import express from "express";
import updateHandler from "../public/JavaScripts/function/updateHandler";
var router = express.Router();

function updateRespond(event: Event) {
  var res = {
    statusCode: 200,
    success: true,
    data: event,
  };
  return res;
}

router.post("/receivestatus", (req, res) => {
  updateHandler(req.body.receiveStatus, req.body.Id, "receiveStatus")
    .catch((reason) => {
      var b = Boom.badRequest(reason);
      res.json(b.output.payload);
    })
    .then((event: any) => {
      if (event) res.json(updateRespond(event));
    });
});

router.post("/sendstatus", (req, res) => {
  updateHandler(req.body.sendStatus, req.body.Id, "sendStatus")
    .catch((reason) => {
      var b = Boom.badRequest(reason);
      res.json(b.output.payload);
    })
    .then((event: any) => {
      if (event) res.json(updateRespond(event));
    });
});

router.post("/handlestatus", (req, res) => {
  updateHandler(req.body.handleStatus, req.body.Id, "handleStatus")
    .catch((reason) => {
      var b = Boom.badRequest(reason);
      res.json(b.output.payload);
    })
    .then((event: any) => {
      if (event) res.json(updateRespond(event));
    });
});

export default router;
