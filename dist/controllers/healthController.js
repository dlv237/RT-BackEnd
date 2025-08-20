"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = health;
const healthService_1 = require("../services/healthService");
async function health(_req, res, next) {
    try {
        const data = await (0, healthService_1.getHealth)();
        res.json(data);
    }
    catch (err) {
        next(err);
    }
}
