/*
 * File: auth.ts
 * Project: functions
 * File Created: Saturday, 18th April 2026 2:01:25 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 2:02:55 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Router as createRouter, Request, Response } from "express";

const router = createRouter();

router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

export default router;
