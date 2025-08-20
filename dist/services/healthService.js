"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = getHealth;
async function getHealth() {
    return {
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
    };
}
