/*
 * File: app.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 1:37:41 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 2:14:14 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

import express from "express";
import cookieParser from "cookie-parser";
import healthRoutes from "./routes/health";
import loginRoutes from "./routes/login";
import meRoutes from "./routes/me";
import logoutRoutes from "./routes/logout";
import { errorHandler } from "./middleware/errorHandler";

/**
 * Creates the main application instance.
 * @return {express.Application} The Express application instance.
 */
function createApp() {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use(errorHandler);
    app.use("/", healthRoutes);
    app.use("/", loginRoutes);
    app.use("/", meRoutes);
    app.use("/", logoutRoutes);
    return app;
}

export default createApp();
