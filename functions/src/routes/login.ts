/*
 * File: login.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 2:01:25 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 2:25:48 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Router as createRouter, Request, Response, NextFunction } from "express";
import { loginUser } from "../services/auth";
import { getConfig } from "../config";

const router = createRouter();
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const config = getConfig();
        const result = await loginUser(req.body);

        res.cookie(config.authCookieName as string, result.token, {
            httpOnly: true,
            secure: config.nodeEnv === "production",
            sameSite: "lax",
            path: "/"
        });

        res.status(200).json({
            token: result.token,
            username: result.username,
            expiresIn: result.expiresIn
        });
    } catch (error) {
        next(error);
    }
});

export default router;
