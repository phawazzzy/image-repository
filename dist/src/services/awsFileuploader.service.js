"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSFileUploader = void 0;
var aws_sdk_1 = require("aws-sdk");
var config_1 = __importDefault(require("../../config"));
var inversify_1 = require("inversify");
var cloudinary_1 = __importDefault(require("cloudinary"));
var streamifier_1 = __importDefault(require("streamifier"));
var AWSFileUploader = /** @class */ (function () {
    function AWSFileUploader() {
        this.bucketName = config_1.default.server.bucketName;
        this.client = new aws_sdk_1.S3({
            region: config_1.default.server.defaultRegion
        });
        /**
         * cloudinary config
         */
        cloudinary_1.default.v2.config({
            cloud_name: config_1.default.server.cloud_name,
            api_key: config_1.default.server.cloud_key,
            api_secret: config_1.default.server.cloud_secret
        });
    }
    AWSFileUploader.prototype.generateFileKey = function (file, timestamp) {
        return file.name + "-" + timestamp + "." + file.extension;
    };
    AWSFileUploader.prototype.uploadFileToS3 = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, fileKey, hi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now();
                        fileKey = this.generateFileKey(file, timestamp);
                        return [4 /*yield*/, this.client
                                .putObject({
                                Bucket: this.bucketName,
                                Key: fileKey,
                                ContentType: file.type,
                                Body: file.content,
                                ACL: 'public-read'
                            })
                                .promise()];
                    case 1:
                        hi = _a.sent();
                        console.log(hi);
                        return [2 /*return*/, {
                                url: "https://revie.s3.amazonaws.com/" + fileKey,
                                path: this.bucketName + "/" + fileKey,
                                name: fileKey
                            }];
                }
            });
        });
    };
    AWSFileUploader.prototype.uploadFileToCloudinary = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var cldUploadStream = cloudinary_1.default.v2.uploader.upload_stream({
                            folder: 'shopify-challenge'
                        }, function (error, result) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (result) {
                                        resolve({
                                            path: result.url,
                                            name: result.public_id
                                        });
                                    }
                                    else {
                                        reject(error);
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        });
                        streamifier_1.default.createReadStream(_this.toBuffer(file.content)).pipe(cldUploadStream);
                    })];
            });
        });
    };
    AWSFileUploader.prototype.toBuffer = function (arrayBuffer) {
        var buf = Buffer.alloc(arrayBuffer.byteLength);
        var view = new Uint8Array(arrayBuffer);
        for (var i = 0; i < buf.length; ++i) {
            buf[i] = view[i];
        }
        return buf;
    };
    AWSFileUploader.prototype.upload = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.uploadFileToCloudinary(files)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.log('error', error_1);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AWSFileUploader = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], AWSFileUploader);
    return AWSFileUploader;
}());
exports.AWSFileUploader = AWSFileUploader;
