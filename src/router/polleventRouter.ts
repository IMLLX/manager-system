import express from "express";
import selectPoll from "../public/JavaScripts/function/selectPoll";
import toSQL from "../public/JavaScripts/function/toSQL";
import knex from "../public/JavaScripts/static/knex";
var router = express.Router();

router.get("/active", function (req, res) {
  var touserCode = req.body.touserCode || req.query.touserCode;
  selectPoll(touserCode)
    .catch((reason) => {
      res.json({ message: reason, success: true, statusCode: 200 });
    })
    .then((polls: Array<Poll>) => {
      if (polls) {
        res.json({
          statusCode: 200,
          success: true,
          data: polls,
        });
        polls.forEach((poll) => {
          poll.isReceived = true;
          delete poll.fromUser;
          toSQL(
            knex("pollevent").update(poll).where({ Id: poll.Id }).toQuery()
          );
        });
      }
    });
});

export default router;
