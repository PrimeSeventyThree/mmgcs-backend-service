/*
 * File: me.ts
 * Project: backend-app
 * File Created: Sunday, 19th April 2026 6:57:59 am
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 2:44:17 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Router as createRouter, Request, Response, NextFunction } from "express";
import { requireAuth } from "../middleware/auth";
import { getUserByName } from "../services/userStore";
import { AuthenticatedRequest } from "../types";

const router = createRouter();

router.get("/me", requireAuth, (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const user = getUserByName(authReq.auth.username);

        res.status(200).json({
            username: user?.username,
            email: user?.email,
            roles: user?.roles
        });
    } catch (error) {
        next(error);
    }
});

export default router;
