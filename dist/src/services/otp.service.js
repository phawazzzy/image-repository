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
exports.OtpService = void 0;
var http_errors_1 = require("http-errors");
var inversify_1 = require("inversify");
var types_1 = __importDefault(require("../../config/types"));
var otp_repository_1 = require("../repository/otp.repository");
var OtpService = /** @class */ (function () {
    function OtpService(_otpRepo) {
        this._otpRepo = _otpRepo;
    }
    OtpService.prototype.createOtp = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var code, checkCode, savedCode, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = this.generate();
                        console.log(code);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._otpRepo.findLastRecord({ email: email, used: false })];
                    case 2:
                        checkCode = _a.sent();
                        if (checkCode)
                            return [2 /*return*/, checkCode.code];
                        return [4 /*yield*/, this._otpRepo.create({ code: code, time: Date.now(), email: email, used: false })];
                    case 3:
                        savedCode = _a.sent();
                        if (savedCode)
                            return [2 /*return*/, code];
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: throw Error('Could not create otp');
                }
            });
        });
    };
    OtpService.prototype.verifyOtp = function (email, code) {
        return __awaiter(this, void 0, void 0, function () {
            var checkCode, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this._otpRepo.findLastRecord({ email: email, used: false })];
                    case 1:
                        checkCode = _a.sent();
                        if (!(checkCode.code == code)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._otpRepo.updateOne({ _id: checkCode._id }, { used: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: throw new http_errors_1.Forbidden('Invalid code');
                }
            });
        });
    };
    OtpService.prototype.generate = function () {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    OtpService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.OtpRepository)),
        __metadata("design:paramtypes", [otp_repository_1.OtpRepository])
    ], OtpService);
    return OtpService;
}());
exports.OtpService = OtpService;
