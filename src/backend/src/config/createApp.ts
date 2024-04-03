import express from "express";
import cluster from "cluster";
import { cpus } from "os";

export default function createExpressApp() {
    const app = express();
    const modeCluster = process.env.MODE === "CLUSTER";
    const PORT = process.env.BACKENDPORT ?? 8081;

    // TODO: Conection to DB

    if (modeCluster && cluster.isPrimary) {
        const numCPUS = cpus().length;
        console.log(`CPUs Quantity: ${numCPUS}`);
        console.log(`PID MASTER: ${process.pid}`);
        // eslint-disable-next-line no-plusplus
        for (let i: number = 0; i < numCPUS; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker) => {
            console.log(
                "Worker",
                worker.process.pid,
                "died",
                new Date().toLocaleString()
            );
            cluster.fork();
        });
    } else {
        app.listen(PORT, () => {
            console.log(
                `Servidor de express escuchando puerto ${PORT} - PID WORKER ${process.pid}`
            );
        });
    }

    return app;
}
