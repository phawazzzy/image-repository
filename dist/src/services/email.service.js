"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.EmailSendingService = exports.TEMPLATES = void 0;
var axios_1 = __importDefault(require("axios"));
var config_1 = __importDefault(require("../../config"));
exports.TEMPLATES = {
    REQUEST: 'request',
    VERIFY: 'verify',
    PAID: 'paid',
    RECEIPT: 'receipt',
    WELCOME: 'welcome'
};
var EmailSendingService = /** @class */ (function () {
    function EmailSendingService() {
    }
    EmailSendingService.sendRegistrationCode = function (name, email, code) {
        return __awaiter(this, void 0, void 0, function () {
            var body, subject, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = "Hello " + name + " You have successfully registered on Payday\n Here is your verification code " + code;
                        subject = 'AUFERA Registration - Welcome';
                        data = { code: code };
                        return [4 /*yield*/, this.callEmailService({ receiver: email, body: body, subject: subject, templateKey: exports.TEMPLATES.VERIFY, data: data })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmailSendingService.sendRegistrationConfirmation = function (email, name) {
        return __awaiter(this, void 0, void 0, function () {
            var body, subject, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = "Hello " + email + " You have successfully confirmed you account, welcome";
                        subject = 'Welcome || Thanks for joining PayDay';
                        data = { name: name };
                        return [4 /*yield*/, this.callEmailService({
                                receiver: email,
                                body: body,
                                subject: subject,
                                templateKey: exports.TEMPLATES.WELCOME,
                                data: data
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmailSendingService.sendForgotPasswordCode = function (email, code) {
        return __awaiter(this, void 0, void 0, function () {
            var body, subject, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = "Hello " + email + ",\n            <p> You requested for a password reset </p>\n            <p> Please use this code to continue to reset your password </p>\n            <h2> <b> " + code + " <b> </h2>\n            ";
                        subject = 'Forgot Password';
                        return [4 /*yield*/, this.callEmailService({ receiver: email, body: body, subject: subject, templateKey: 'forgotPassword' })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmailSendingService.sendResetPasswordConfirmation = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var body, subject, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = "Hello " + email + ",\n            <p> your password has be reset succussful </p>\n            ";
                        subject = 'Reset password successful';
                        return [4 /*yield*/, this.callEmailService({ receiver: email, body: body, subject: subject, templateKey: 'resetPassword' })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmailSendingService.callEmailService = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var URL, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        URL = config_1.default.server.emailServiceUrl;
                        console.log(URL);
                        return [4 /*yield*/, axios_1.default.post(URL, __assign({}, data))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_5 = _a.sent();
                        throw Error(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EmailSendingService;
}());
exports.EmailSendingService = EmailSendingService;
