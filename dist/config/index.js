"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var SERVER_PORT = process.env.PORT || 3000;
var DB_URL = (process.env.NODE_ENV == 'test' ? process.env.DB_URL_TEST : process.env.DB_URL) || 'mongodb://localhost:27017/aufera';
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || 'http://localhost:4000/api/email/send';
var SERVER = {
    port: SERVER_PORT,
    dbUrl: DB_URL,
    hostname: SERVER_HOSTNAME,
    emailServiceUrl: EMAIL_SERVICE_URL
};
var config = {
    server: SERVER
};
exports.default = config;
