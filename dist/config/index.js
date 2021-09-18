"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var SERVER_PORT = process.env.PORT || 3000;
var DB_URL = (process.env.NODE_ENV == 'test' ? process.env.DB_URL_TEST : process.env.DB_URL) || 'mongodb://localhost:27017/imagerepository';
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || 'http://localhost:4000/api/email/send';
var S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || 'AKIA2JHSJTWRGFLPXKGM';
var S3_ACCESS_SECRET = process.env.S3_ACCESS_SECRET || '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';
var BUCKET_NAME = process.env.BUCKET_NAME || 'revie';
var DEFUALT_REGION = process.env.REGION || 'us-east-2';
var CLOUD_NAME = process.env.CLOUD_NAME || '';
var CLOUD_KEY = process.env.CLOUD_KEY || '';
var CLOUD_SECRET = process.env.CLOUD_SECRET || '';
var JWT_SECRET = process.env.JWT_SECRET || '$this$is$a$secret';
var SERVER = {
    port: SERVER_PORT,
    dbUrl: DB_URL,
    hostname: SERVER_HOSTNAME,
    emailServiceUrl: EMAIL_SERVICE_URL,
    s3AccessKey: S3_ACCESS_KEY,
    s3AccessSecret: S3_ACCESS_SECRET,
    bucketName: BUCKET_NAME,
    defaultRegion: DEFUALT_REGION,
    cloud_name: CLOUD_NAME,
    cloud_key: CLOUD_KEY,
    cloud_secret: CLOUD_SECRET,
    jwtSecret: JWT_SECRET
};
var config = {
    server: SERVER
};
exports.default = config;
