"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = notFound;
function notFound(_req, res, _next) {
    res.status(404).json({ ok: false, message: 'Resource not found' });
}
