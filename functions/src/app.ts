/*
 * File: app.ts
 * Project: functions
 * File Created: Saturday, 18th April 2026 1:37:41 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 2:12:52 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import express from "express";
import authRoutes from "./routes/auth";

/**
 * Creates the main application instance.
 * @return {express.Application} The Express application instance.
 */
function createApp() {
    const app = express();
    app.use(express.json());
    app.use("/", authRoutes);
    return app;
}

export default createApp();
