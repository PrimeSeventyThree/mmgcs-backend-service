/*
 * File: jwt.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 7:12:51 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 6:41:07 am
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
import { AuthContext } from "../types";
/**
 * Signs a JWT token
 * @param {AuthContext} payload The payload for the JWT token
 * @return {string} The signed JWT token
 */
export function signAuthToken(payload: AuthContext): string {
    const config = getConfig();
    const options: SignOptions = {
        expiresIn: config.jwtExpireTime as StringValue | number
    };
    return jwt.sign(payload, config.jwtSecret, options);
}

/**
 * Verifies a JWT token
 * @param {string} token The JWT token to verify
 * @return {AuthContext} The decoded payload if the token is valid
 */
export function verifyAuthToken(token: string): AuthContext {
    const config = getConfig();
    return jwt.verify(token, config.jwtSecret) as AuthContext;
}
