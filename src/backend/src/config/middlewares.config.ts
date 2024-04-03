// LIBRERIES
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default {
    config(app: express.Express) {
        app.use(
            cors({
                // FIXME: Change the port to vite port
                origin: "http://localhost:8080",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                preflightContinue: false,
                optionsSuccessStatus: 204,
                credentials: true,
                allowedHeaders: [
                    "Content-Type",
                    "Authorization",
                    "Content-Disposition",
                    "Access-Control-Allow-Origin",
                    "Access-Control-Allow-Credentials",
                ],
            })
        );
        app.use(cookieParser());

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    },
};
