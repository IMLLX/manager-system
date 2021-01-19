import express from "express";
import bodyParser from "body-parser";
import http from "http";
import createRouter from "./router/createRouter";
import selectRouter from "./router/selectRouter";
import updateRouter from "./router/updateRouter";
import polleventRouter from "./router/polleventRouter";

process.env.ENV = "DEV";

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.set("port", port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/create", createRouter);
app.use("/update", updateRouter);
app.use("/select", selectRouter);
app.use("/poll", polleventRouter);

const server = http.createServer(app);
server.listen(port);

export default app;
