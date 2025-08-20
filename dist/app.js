"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
// Load environment variables early
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
// Core middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
(0, routes_1.setRoutes)(app);
// 404 and error handling
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}!`);
});
// Graceful shutdown
const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down...`);
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
    // Force exit after 10s
    setTimeout(() => process.exit(1), 10000).unref();
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
