/*
 * File: userStore.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 3:45:36 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 7:13:46 am
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
    console.debug(`Adding user: ${JSON.stringify(user)}`);
    users.set(user.username, user);
}

/**
 * Get a user by their user name.
 * @param {string} username - The username of the user to retrieve.
 * @return {UserRecord | undefined} The user if found, otherwise undefined.
 */
export function getUserByName(username: string): UserRecord | undefined {
    // console.debug(`Looking up user by username: ${username}`);
    // console.debug(`Current users in store: ${JSON.stringify(Array.from(users.values()))}`);
    return users.get(username);
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
