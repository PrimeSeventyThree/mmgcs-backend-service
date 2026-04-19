/*
 * File: logout.ts
 * Project: backend-app
 * File Created: Sunday, 19th April 2026 8:18:24 am
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 3:59:39 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Router as createRouter } from "express";
import { requireAuth } from "../middleware/auth";
import { getConfig } from "../config";

const router = createRouter();

router.post("/logout", requireAuth, (_req, res) => {
    const config = getConfig();
    res.clearCookie(config.authCookieName as string, {
        httpOnly: true,
        secure: config.cookieSecure,
        sameSite: "lax",
        path: "/"
    });

    res.status(200).json({ message: "Logged out successfully" });
});

export default router;
