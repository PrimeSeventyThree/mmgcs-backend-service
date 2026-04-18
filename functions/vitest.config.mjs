/*
 * File: vitest.config.mjs
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 4:58:44 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 5:58:06 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        globals: true,
        include: ["src/**/*.test.ts"],
        exclude: ["lib/**", "node_modules/**"]
    }
});
