// LIBRERIES
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.json({
        msg: "Hello from API",
    });
});

export default userRouter;
