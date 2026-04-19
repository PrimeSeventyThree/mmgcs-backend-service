/*
 * File: config.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 2:36:45 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 11:21:21 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

/**
 * Checks that the specified environment variable is set and returns its value.
 *
 * @param {string} name The name of the environment variable to check.
 * @return {string} The value of the environment variable.
 * @throws {Error} If the environment variable is not set or is empty.
 */
export function checkEnv(name: string): string {
    const value = process.env[name];

    if (!value || value.trim() === "") {
        throw new Error(`Missing required env var: ${name}`);
    }

    return value;
}

/**
 * Gets the environment variable value or returns a fallback.
 * @param {string} name The name of the environment variable.
 * @param {string | number} fallback The fallback value.
 * @return {string | number} The environment variable value or the fallback.
 */
function getOptionalEnvVar(name: string, fallback: string | number): string | number {
    const value = process.env[name];
    if (value && value.trim() !== "") {
        // coerce to number if fallback is a number
        return typeof fallback === "number" ? Number(value) : value;
    }
    return fallback;
}

/**
 * Gets the required environment variable value or throws an error.
 * @param {string} name The name of the environment variable.
 * @return {string} The value of the environment variable.
 * @throws {Error} If the environment variable is not set or is empty.
 */
function getRequiredEnvVar(name: string): string {
    const value = process.env[name];
    if (!value || value.trim() === "") throw new Error(`Missing required env var: ${name}`);
    return value;
}

/**
 * Config vars for development and production environments.
 * @return {object} The config object with all config vars.
 */
export function getConfig() {
    return {
        nodeEnv: getOptionalEnvVar("NODE_ENV", "development"),
        cookieSecure: getOptionalEnvVar("AUTH_COOKIE_SECURE", "false") === "true",
        jwtSecret: getRequiredEnvVar("JWT_SECRET"),
        jwtExpireTime: getOptionalEnvVar("JWT_EXPIRES_IN", 3600),
        authCookieName: getOptionalEnvVar("AUTH_COOKIE_NAME", "auth_token")
    };
}
