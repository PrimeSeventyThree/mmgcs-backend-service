/*
 * File: seedUsers.test.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 5:14:15 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 5:20:47 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { seedUsers, resetSeedUsersForTests } from "./seedUsers";
import { clearUsers, getAllUsers, getUserByName } from "./services/userStore";
import { NotFoundError } from "./errors/HttpError";
/**
 * Helper function to set the required environment variables for seeding users
 */
function setRequiredSeedEnv(): void {
    process.env.JWT_SECRET = "test-secret";

    process.env.USER1_EMAIL = "user@example.com";
    process.env.USER1_NAME = "Test User";
    process.env.USER1_PASSWORD = "password123";
    process.env.USER1_ROLES = "user";

    process.env.USER2_EMAIL = "admin@example.com";
    process.env.USER2_NAME = "Admin User";
    process.env.USER2_PASSWORD = "password456";
    process.env.USER2_ROLES = "admin";
}

/**
 * Helper function to clear the environment variables used for seeding users
 */
function clearSeedEnv(): void {
    delete process.env.JWT_SECRET;

    delete process.env.USER1_EMAIL;
    delete process.env.USER1_NAME;
    delete process.env.USER1_PASSWORD;
    delete process.env.USER1_ROLES;

    delete process.env.USER2_EMAIL;
    delete process.env.USER2_NAME;
    delete process.env.USER2_PASSWORD;
    delete process.env.USER2_ROLES;
}

describe("seedUsers", () => {
    beforeEach(async () => {
        clearUsers();
        resetSeedUsersForTests();
        clearSeedEnv();
        setRequiredSeedEnv();
        await seedUsers();
    });

    afterEach(() => {
        clearUsers();
        resetSeedUsersForTests();
        clearSeedEnv();
    });

    it("seeds two users from environment variables", () => {
        (async () => {
            await seedUsers();
        })();

        const users = getAllUsers();

        // Check that two users were seeded
        expect(users).toHaveLength(2);

        // Check user1 details
        expect(users[0]).toMatchObject({
            id: "user-1",
            email: "user@example.com",
            username: "Test User",
            roles: ["user"]
        });

        // Check user2 details
        console.debug("Seeded user2 in test:", users[1]);
        expect(users[1]).toMatchObject({
            id: "user-2",
            email: "admin@example.com",
            username: "Admin User",
            roles: ["admin"]
        });

        // Check that passwords are hashed
        expect(users[0].passwordHash).not.toBe("password123");
        expect(users[1].passwordHash).not.toBe("password456");
        expect(users[0].passwordHash.length).toBeGreaterThan(20);
        expect(users[1].passwordHash.length).toBeGreaterThan(20);
    });

    it("checks that users are not seeded twice", () => {
        (async () => {
            await seedUsers();
            await seedUsers();
        })();

        const users = getAllUsers();
        expect(users).toHaveLength(2); // only 2 users expected
    });

    it("returns the correct user for a valid email", () => {
        console.log(getAllUsers());
        const user = getUserByName("Admin User");
        console.debug("Retrieved user in test:", user);
        expect(user).toBeDefined();
        expect(user?.username).toBe("Admin User");
    });

    it("throws NotFoundError for a non-existent user", () => {
        expect(() => getUserByName("nonexistentuser")).toThrow(NotFoundError);
    });

    describe("when env is invalid", () => {
        beforeEach(() => {
            clearUsers();
            resetSeedUsersForTests();
            clearSeedEnv();
            setRequiredSeedEnv();
        });

        it("throws when a required environment variable is missing", async () => {
            delete process.env.USER1_EMAIL;
            const error = "Missing required env var: USER1_EMAIL";
            await expect(seedUsers()).rejects.toThrow(error);
            expect(getAllUsers()).toHaveLength(0);
        });
    });
});
