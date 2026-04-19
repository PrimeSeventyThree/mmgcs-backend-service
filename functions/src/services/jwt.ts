/*
 * File: jwt.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 7:12:51 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 11:23:20 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import jwt, { SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";
import { getConfig } from "../config";

export interface AuthTokenPayload {
    username: string;
}

/**
 * Signs a JWT token
 * @param {AuthTokenPayload} payload The payload for the JWT token
 * @return {string} The signed JWT token
 */
export function signAuthToken(payload: AuthTokenPayload): string {
    const config = getConfig();
    const options: SignOptions = {
        expiresIn: config.jwtExpireTime as StringValue | number
    };
    return jwt.sign(payload, config.jwtSecret, options);
}
