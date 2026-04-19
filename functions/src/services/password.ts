/*
 * File: password.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 7:02:15 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 7:07:51 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import bcrypt from "bcryptjs";

/**
 *  Verifies a password against a bcrypt hash.
 * @param {string} pass The plain text password to verify.
 * @param {string} hash The bcrypt hash to verify against.
 * @return {Promise<boolean>} Resolves to true if the password
 * matches the hash, or false otherwise.
 */
export async function verifyPass(pass: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pass, hash);
}
