/*
 * File: auth.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 8:16:52 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 1:55:00 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { getUserByName } from "./userStore";
import { verifyPass } from "./password";
import { signAuthToken } from "./jwt";
import { getConfig } from "../config";
import { AuthError } from "../errors/HttpError";

export interface LoginInput {
    username: string;
    password: string;
}

export interface LoginResult {
    token: string;
    username: string;
    expiresIn: number;
}

/**
 * Logs in a user with the provided credentials
 * @param {LoginInput} input - The login credentials
 * @return {Promise<LoginResult>} The login result containing the user and JWT token
 */
export async function loginUser(input: LoginInput): Promise<LoginResult> {
    const username = input.username?.trim();
    const password = input.password;

    if (!username || !password) {
        throw new AuthError();
    }

    const user = getUserByName(username);

    if (!user) {
        throw new AuthError();
    }

    console.debug(`Attempting to log in user: ${username}`);
    const passwordValid = await verifyPass(password, user.passwordHash);

    if (!passwordValid) {
        throw new AuthError();
    }

    console.debug(`User ${username} logged in successfully`);
    const token = signAuthToken({
        id: user.id,
        email: user.email,
        roles: user.roles,
        username: user.username
    });

    return {
        token,
        username: user.username,
        expiresIn: getConfig().jwtExpireTime as number
    };
}
