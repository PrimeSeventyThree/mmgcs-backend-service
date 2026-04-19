/*
 * File: auth.ts
 * Project: backend-app
 * File Created: Sunday, 19th April 2026 6:26:33 am
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 2:43:50 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Request, Response, NextFunction } from "express";
import { getConfig } from "../config";
import { verifyAuthToken } from "../services/jwt";
import { AuthContext } from "../types";

/**
 * Middleware to require authentication for protected routes.
 * Checks for a valid JWT token in the cookies and attaches the auth context to the request.
 * @param {Request} req The Express request object
 * @param {Response} res The Express response object
 * @param {NextFunction} next The next middleware function
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
    const config = getConfig();
    const token = req.cookies?.[config.authCookieName];

    console.debug("auth cookie name", config.authCookieName);
    console.debug("cookie keys", Object.keys(req.cookies || {}));
    console.debug("has auth token", Boolean(token));

    if (!token) {
        res.status(401).json({ error: "Authentication required" });
        return;
    }

    try {
        const payload = verifyAuthToken(token);
        console.debug("verified auth payload", {
            id: payload.id,
            email: payload.email,
            username: payload.username,
            roles: payload.roles
        });
        (req as Request & { auth: AuthContext }).auth = {
            id: payload.id,
            email: payload.email,
            username: payload.username,
            roles: payload.roles
        };

        next();
    } catch (error) {
        next(error);
    }
}
