/*
 * File: types.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 2:24:56 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 9:10:31 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

export type UserRole = "user" | "admin";

/** roles is an array of roles assigned to the user (based on the assignment) */
export interface UserRecord {
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    roles: UserRole[];
}
