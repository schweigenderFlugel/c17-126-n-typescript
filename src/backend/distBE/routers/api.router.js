"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRERIES
const express_1 = require("express");
// ROUTES
const user_routes_1 = __importDefault(require("./user.routes"));
const router = (0, express_1.Router)();
router.use("/user", user_routes_1.default);
exports.default = router;
