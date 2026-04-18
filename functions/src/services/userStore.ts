/*
 * File: userStore.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 3:45:36 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 6:52:17 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

import { UserRecord } from "../types";

const users = new Map<string, UserRecord>();

/**
 * Add a new user to the in-memory store.
 * @param {UserRecord} user - The user to add.
 */
export function addUser(user: UserRecord): void {
    users.set(user.email, user);
}

/**
 * Get a user by their email.
 * @param {string} email - The email of the user to retrieve.
 * @return {UserRecord | undefined} The user if found, otherwise undefined.
 */
export function getUserByEmail(email: string): UserRecord | undefined {
    return users.get(email.toLowerCase());
}

/**
 * Get all users in the in-memory store.
 * @return {UserRecord[]} An array of all user records.
 */
export function getAllUsers(): UserRecord[] {
    return Array.from(users.values());
}

/**
 * Clear all users from the in-memory store. This is for tests only.
 */
export function clearUsers(): void {
    users.clear();
}
