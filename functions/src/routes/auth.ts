/*
 * File: auth.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 2:01:25 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 11:25:32 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Router as createRouter, Request, Response } from "express";
import { loginUser } from "../services/auth";
import { getConfig } from "../config";

const errorMap: Record<string, number> = {
    "Email and password are required": 400,
    "Invalid username or password": 401
};

const router = createRouter();

router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const result = await loginUser(req.body);

        res.cookie(getConfig().authCookieName as string, result.token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({
            token: result.token,
            username: result.username,
            expiresIn: result.expiresIn
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        const statusCode = errorMap[message] ?? 500;

        res.status(statusCode).json({ error: message });
    }
});
export default router;
