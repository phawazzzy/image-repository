"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResponse = void 0;
function httpResponse(res, result) {
    var status = result.status, error = result.error, message = result.message, data = result.data, statusCode = result.statusCode;
    res.status(statusCode).json({ status: status, message: message, data: data, error: error });
}
exports.httpResponse = httpResponse;
