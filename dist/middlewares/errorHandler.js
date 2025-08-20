"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(err, _req, res, _next) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    if (process.env.NODE_ENV !== 'production') {
        console.error('[Error]', err);
    }
    res.status(status).json({
        ok: false,
        message,
        code: err.code,
        details: process.env.NODE_ENV !== 'production' ? err.details : undefined,
    });
}
