"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getUsers(_req, res, next) {
    try {
        const users = await prisma_1.default.user.findMany();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
}
