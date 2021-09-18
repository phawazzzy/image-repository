"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRepoRepository = void 0;
var inversify_1 = require("inversify");
var _1 = require(".");
var types_1 = __importDefault(require("../../config/types"));
var mongodb_datasource_1 = require("../datasources/mongodb.datasource");
var repository_model_1 = require("../models/repository.model");
var ImageRepoRepository = /** @class */ (function (_super) {
    __extends(ImageRepoRepository, _super);
    function ImageRepoRepository(dbClient, modelFactory) {
        return _super.call(this, dbClient, modelFactory) || this;
    }
    ImageRepoRepository = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.IDataSource)),
        __param(1, inversify_1.inject(types_1.default.IModelFactory)),
        __param(1, inversify_1.named('imageRepoModel')),
        __metadata("design:paramtypes", [mongodb_datasource_1.MongoDBDataSource, repository_model_1.ImageRepoModel])
    ], ImageRepoRepository);
    return ImageRepoRepository;
}(_1.CrudRepository));
exports.ImageRepoRepository = ImageRepoRepository;