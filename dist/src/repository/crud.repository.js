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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.CrudRepository = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var types_1 = __importDefault(require("../../config/types"));
var inversify_1 = require("inversify");
var CrudRepository = /** @class */ (function () {
    function CrudRepository(dbClient, modelFactory) {
        this.dbClient = dbClient;
        this.modelFactory = modelFactory;
    }
    CrudRepository.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.modelFactory.model().create(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_1 = _a.sent();
                        throw Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.findOne = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(mongoose_1.default.connection.readyState === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dbClient.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.modelFactory.model().findOne(data)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3: return [4 /*yield*/, this.modelFactory.model().findOne(data)];
                    case 4:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log({ error: error_2 });
                        throw Error('Error finding one record');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.modelFactory.model().findById(id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_3 = _a.sent();
                        throw Error('Error finding by Id');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.findWithLimit = function (data, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.modelFactory.model().find(data).limit(limit).sort({ createdAt: -1 })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_4 = _a.sent();
                        throw Error('Error finding by Id');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.findWithLimitAndSkip = function (data, limit, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var skip, res, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        skip = limit * (page - 1);
                        return [4 /*yield*/, this.modelFactory.model().find(data).skip(skip).limit(limit).sort({ createdAt: -1 })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_5 = _a.sent();
                        throw Error('Error finding by Id');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.findAll = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.modelFactory.model().find(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw Error('Error finding all records');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.updateOne = function (filter, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, res, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(mongoose_1.default.connection.readyState === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dbClient.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.modelFactory.model().updateOne(filter, data)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3: return [4 /*yield*/, this.modelFactory.model().updateOne(filter, data)];
                    case 4:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_7 = _a.sent();
                        throw Error(error_7.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.updateMany = function (filter, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.modelFactory.model().updateMany(filter, data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_8 = _a.sent();
                        throw Error(error_8.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.deleteOne = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.modelFactory.model().deleteOne(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_9 = _a.sent();
                        throw Error('Error');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.deleteMany = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.modelFactory.model().deleteMany(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_10 = _a.sent();
                        throw Error('Error');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CrudRepository.prototype.modelObject = function () {
        return this.modelFactory.model();
    };
    CrudRepository.prototype.dataBaseClient = function () {
        return this.dbClient;
    };
    CrudRepository = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.IDataSource)),
        __param(1, inversify_1.inject(types_1.default.IModelFactory)),
        __metadata("design:paramtypes", [Object, Object])
    ], CrudRepository);
    return CrudRepository;
}());
exports.CrudRepository = CrudRepository;
