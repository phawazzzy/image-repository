"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
var types_1 = __importDefault(require("./config/types"));
var mongodb_datasource_1 = require("./src/datasources/mongodb.datasource");
var models_1 = require("./src/models");
var repository_1 = require("./src/repository");
var otp_repository_1 = require("./src/repository/otp.repository");
var otp_service_1 = require("./src/services/otp.service");
var user_service_1 = require("./src/services/user.service");
var container = new inversify_1.Container();
exports.container = container;
// Datasource
container.bind(types_1.default.CrudRepository).to(repository_1.CrudRepository);
container.bind(types_1.default.IDataSource).to(mongodb_datasource_1.MongoDBDataSource);
container.bind(types_1.default.MongodbClient).to(mongodb_datasource_1.MongoDBDataSource);
// REPOSITORY
container.bind(types_1.default.UserRepositry).to(repository_1.UserRepository);
container.bind(types_1.default.OtpRepository).to(otp_repository_1.OtpRepository);
//SERVICE
container.bind(types_1.default.UserService).to(user_service_1.UserService);
container.bind(types_1.default.OtpService).to(otp_service_1.OtpService);
//MODELS
container.bind(types_1.default.IModelFactory).to(models_1.UserModel).whenTargetNamed('userModel');
container.bind(types_1.default.IModelFactory).to(models_1.OtpModel).whenTargetNamed('otpModel');
