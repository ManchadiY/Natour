"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    err.statuscode = err.statuscode || 400;
    err.status = err.status || "failed";
    res.status(err.statuscode).json({
        status: err.status,
        message: err.message,
    });
};
exports.default = globalErrorHandler;
