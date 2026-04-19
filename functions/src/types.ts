/*
 * File: types.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 2:24:56 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 6:37:41 am
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { Request } from "express";

export type UserRole = "user" | "admin";

/** roles is an array of roles assigned to the user (based on the assignment) */
export interface UserRecord {
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    roles: UserRole[];
}
export interface AuthContext {
    id: string;
    email: string;
    username: string;
    roles: UserRole[];
}
export interface AuthenticatedRequest extends Request {
    auth: AuthContext;
}
