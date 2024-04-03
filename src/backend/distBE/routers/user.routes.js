"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRERIES
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.get("/", (req, res) => {
    res.json({
        msg: "Hello from API",
    });
});
exports.default = userRouter;
