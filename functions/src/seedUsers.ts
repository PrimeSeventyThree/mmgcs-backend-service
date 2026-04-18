/*
 * File: seedUsers.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 3:53:26 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 4:57:17 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import bcrypt from "bcryptjs";
import { addUser } from "./services/userStore";
import { checkEnv } from "./config";
import { UserRole } from "./types";

let alreadySeeded = false;
/**
 * Seeds the in-memory user store with initial users.
 * Loads user data from environment variables and
 * hashes passwords using bcrypt before adding them to the store.
 */
export function seedUsers() {
    console.debug("Seeding users...");
    if (alreadySeeded) {
        console.debug("Users have already been seeded. Skipping.");
        return;
    }
    const saltRounds = 12;

    const user1 = {
        id: "user-1",
        email: checkEnv("USER1_EMAIL").toLowerCase(),
        displayName: checkEnv("USER1_NAME"),
        passwordHash: bcrypt.hashSync(checkEnv("USER1_PASSWORD"), saltRounds),
        roles: parseRoles(checkEnv("USER1_ROLES"))
    };

    const user2 = {
        id: "user-2",
        email: checkEnv("USER2_EMAIL").toLowerCase(),
        displayName: checkEnv("USER2_NAME"),
        passwordHash: bcrypt.hashSync(checkEnv("USER2_PASSWORD"), saltRounds),
        roles: parseRoles(checkEnv("USER2_ROLES"))
    };

    addUser(user1);
    addUser(user2);
    alreadySeeded = true;

    console.debug("Seeded users:", [user1.email, user2.email]);
}

/**
 * Parses a comma-separated string of user roles into an array of UserRole.
 *
 * Based on the assignment:
 *----------------------------------
 * **Success response — 200 OK:**

{
    "username": "string",
    "email": "string",
    "roles": ["string"]
}
 *----------------------------------
 * Since the `roles` field is an array of strings,
 * we assume that the input will be a single string
 * containing comma-separated role values.
 *
 * @param {string} raw The raw string containing comma-separated user roles.
 * @return {UserRole[]} An array of UserRole values.
 */
function parseRoles(raw: string): UserRole[] {
    return raw
        .split(",")
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean) as UserRole[];
}

/**
 * Resets the seeding state to allow reseeding users.
 * This is intended for testing purposes only.
 */
export function resetSeedUsersForTests(): void {
    alreadySeeded = false;
}
