/*
 * File: auth.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 8:16:52 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 11:23:50 pm
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
    console.debug(`Attempting to log in user: ${JSON.stringify(input)}`);
    const username = input.username?.trim();
    const password = input.password;

    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    const user = getUserByName(username);

    if (!user) {
        throw new Error("User not found");
    }

    const passwordValid = await verifyPass(password, user.passwordHash);

    if (!passwordValid) {
        throw new Error("Wrong password");
    }

    console.debug(`User ${username} logged in successfully`);
    console.debug(`User record: ${JSON.stringify(user)}`);

    const token = signAuthToken({
        username: user.username
    });

    return {
        token,
        username: user.username,
        expiresIn: getConfig().jwtExpireTime as number
    };
}
