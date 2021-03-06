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
exports.UserService = void 0;
var inversify_1 = require("inversify");
var types_1 = __importDefault(require("../../config/types"));
var repository_1 = require("../repository");
var http_errors_1 = require("http-errors");
var hash_service_1 = require("./hash.service");
var otp_service_1 = require("./otp.service");
var jwt_service_1 = require("./jwt.service");
var UserService = /** @class */ (function () {
    function UserService(_repo, _otpService) {
        this._repo = _repo;
        this._otpService = _otpService;
    }
    UserService.prototype.userSignup = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, email, password, user, passwordHash, createUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        firstName = data.firstName, email = data.email, password = data.password;
                        return [4 /*yield*/, this._repo.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            throw new http_errors_1.Conflict('Email exist');
                        }
                        return [4 /*yield*/, hash_service_1.HashService.hashPassword(password)];
                    case 2:
                        passwordHash = _a.sent();
                        return [4 /*yield*/, this._repo.create({ firstName: firstName, email: email, password: passwordHash })];
                    case 3:
                        createUser = _a.sent();
                        if (!createUser) {
                            throw new http_errors_1.InternalServerError("Unable to save user's data");
                        }
                        return [2 /*return*/, {
                                status: true,
                                statusCode: 201,
                                message: 'User created succesfully',
                                data: createUser,
                                error: null
                            }];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                status: false,
                                statusCode: error_1.statusCode || error_1.status || 500,
                                message: error_1.message || 'Internal server error',
                                error: error_1
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // async sendRegistrationOtp(email: string, firstName: string) {
    //     try {
    //         const code = await this._otpService.createOtp(email);
    //         await EmailSendingService.sendRegistrationCode(firstName, email, code);
    //     } catch (error) {}
    // }
    // userIsVerified(userData: any) {
    //     return userData.verified == 'true' || userData.verified == true;
    // }
    UserService.prototype.userLogin = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordValid, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this._repo.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new http_errors_1.Unauthorized('Wrong credentials');
                        }
                        return [4 /*yield*/, hash_service_1.HashService.isPasswordValid(user.password, password)];
                    case 2:
                        passwordValid = _a.sent();
                        if (!passwordValid) {
                            throw new http_errors_1.Unauthorized('Wrong credentials');
                        }
                        return [4 /*yield*/, jwt_service_1.JWTService.generateToken({ userId: user._id })];
                    case 3:
                        token = _a.sent();
                        return [2 /*return*/, {
                                status: true,
                                statusCode: 200,
                                data: {
                                    email: user.email,
                                    firstName: user.firstName,
                                    token: token
                                },
                                message: 'Authentication successful',
                                error: null
                            }];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                status: false,
                                statusCode: error_2.status || 400,
                                data: null,
                                message: error_2.message,
                                error: error_2
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.UserRepositry)),
        __param(1, inversify_1.inject(types_1.default.OtpService)),
        __metadata("design:paramtypes", [repository_1.UserRepository, otp_service_1.OtpService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
