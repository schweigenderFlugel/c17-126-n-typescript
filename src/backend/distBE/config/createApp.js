"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
function createExpressApp() {
    var _a;
    const app = (0, express_1.default)();
    const modeCluster = process.env.MODE === "CLUSTER";
    const PORT = (_a = process.env.BACKENDPORT) !== null && _a !== void 0 ? _a : 8081;
    // TODO: Conection to DB
    if (modeCluster && cluster_1.default.isPrimary) {
        const numCPUS = (0, os_1.cpus)().length;
        console.log(`CPUs Quantity: ${numCPUS}`);
        console.log(`PID MASTER: ${process.pid}`);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < numCPUS; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on("exit", (worker) => {
            console.log("Worker", worker.process.pid, "died", new Date().toLocaleString());
            cluster_1.default.fork();
        });
    }
    else {
        app.listen(PORT, () => {
            console.log(`Servidor de express escuchando puerto ${PORT} - PID WORKER ${process.pid}`);
        });
    }
    return app;
}
exports.default = createExpressApp;
