/*
 * File: errorHandler.ts
 * Project: backend-app
 * File Created: Sunday, 19th April 2026 1:59:02 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 2:12:46 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

/**
 *  Error Handler.
 *
 * @param {unknown} err error
 * @param {Request} req request
 * @param {Response} res response
 * @param {NextFunction} _next  next
 */
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
}
