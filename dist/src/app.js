"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var inversify_express_utils_1 = require("inversify-express-utils");
var config_1 = __importDefault(require("../config"));
var inversify_config_1 = require("../inversify.config");
var logging_1 = __importDefault(require("../config/logging"));
var mongodb_datasource_1 = require("./datasources/mongodb.datasource");
require("./ioc");
var NAMESPACE = 'Server';
var port = config_1.default.server.port;
var server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.container);
server.setConfig(function (app) {
    app.use(express_1.default.urlencoded({
        extended: true
    }));
    app.use(express_1.default.json());
    app.use(cors_1.default());
});
var app = server.build();
app.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + (req.headers['x-forwarded-for'] || req.socket.remoteAddress) + "]");
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + (req.headers['x-forwarded-for'] || req.socket.remoteAddress) + "]");
    });
    next();
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    return next();
});
app.get('/', function (_, res) {
    res.send("Online on " + new Date());
});
app.use(function (_, res, __) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
new mongodb_datasource_1.MongoDBDataSource()
    .connect()
    .then(function (_) {
    app.listen(port, function () { return logging_1.default.info(NAMESPACE, "Server is running..  " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
})
    .catch(function (err) {
    logging_1.default.info(NAMESPACE, "Error connecting to the DB");
});
