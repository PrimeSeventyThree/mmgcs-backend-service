/*
 * File: config.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 2:36:45 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 4:04:17 pm
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
 * Sets the environment variable value or returns a fallback.
 * @param {string} name The name of the environment variable.
 * @param {string} fallback The fallback value.
 * @return {string} The environment variable value or the fallback.
 */
function setEnvironment(name: string, fallback: string): string {
    const value = process.env[name];
    return value && value.trim() !== "" ? value : fallback;
}

/**
 * Config vars for development and production environments.
 */
export const config = {
    nodeEnv: setEnvironment("NODE_ENV", "development"),
    cookieSecure: setEnvironment("AUTH_COOKIE_SECURE", "false") === "true"
};
