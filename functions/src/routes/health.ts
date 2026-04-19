/*
 * File: health.ts
 * Project: backend-app
 * File Created: Sunday, 19th April 2026 7:04:33 am
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 2:12:36 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Router as createRouter, Request, Response } from "express";
const router = createRouter();

router.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

export default router;
