/*
 * File: me.ts
 * Project: backend-app
 * File Created: Sunday, 19th April 2026 6:57:59 am
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 7:14:05 am
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Router as createRouter, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
import { getUserByName } from "../services/userStore";
import { AuthenticatedRequest } from "../types";

const errorMap: Record<string, number> = {
    Unauthorized: 401
};

const router = createRouter();

router.get("/me", requireAuth, (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const user = getUserByName(authReq.auth.username);

        res.status(200).json({
            username: user?.username,
            email: user?.email,
            roles: user?.roles
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        const statusCode = errorMap[message] ?? 500;
        res.status(statusCode).json({ error: message });
    }
});

export default router;
