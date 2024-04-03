"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const createApp_1 = __importDefault(require("./config/createApp"));
const middlewares_config_1 = __importDefault(require("./config/middlewares.config"));
const api_router_1 = __importDefault(require("./routers/api.router"));
// LOAD .env
dotenv_1.default.config();
// CREATE EXPRESS APP
const app = (0, createApp_1.default)();
// SETUP GLOBAL MIDDLEWARES
middlewares_config_1.default.config(app);
app.use("/api/v1", api_router_1.default);
