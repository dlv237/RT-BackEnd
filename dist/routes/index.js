"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = setRoutes;
const userRoutes_1 = __importDefault(require("./userRoutes"));
const healthController_1 = require("../controllers/healthController");
function setRoutes(app) {
    app.use('/users', userRoutes_1.default);
    app.get('/health', healthController_1.health);
}
