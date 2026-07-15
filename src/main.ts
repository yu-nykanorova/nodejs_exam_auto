//import path from "node:path";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.errors";
import { apiRouter } from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//app.use("/media", express.static(path.join(process.cwd(), "upload")));
//app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/", apiRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});

process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connecting to DB...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("Database available!!!");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            console.log("Database unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        //await cronRunner();
        app.listen(config.PORT, () => {
            console.log(`Server listening on port ${config.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start().catch((e) => {
    console.error("Failed to start", e);
    process.exit(1);
});
