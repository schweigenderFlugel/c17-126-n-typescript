import dotenv from "dotenv";
import createExpressApp from "./config/createApp";
import middlewaresConfig from "./config/middlewares.config";
import apiRouter from "./routers/api.router";
import './models/db/postgres.manager'
// LOAD .env
dotenv.config();

// CREATE EXPRESS APP
const app = createExpressApp();

// SETUP GLOBAL MIDDLEWARES
middlewaresConfig.config(app);

app.use("/api/v1", apiRouter); // 
