"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var config_1 = __importDefault(require("./config"));
exports.default = knex_1.default({ client: "mysql", connection: config_1.default });
