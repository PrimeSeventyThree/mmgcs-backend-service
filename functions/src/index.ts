/*
 * File: index.ts
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 1:05:08 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2026 6:56:53 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import "dotenv/config";

import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import { seedUsers } from "./seedUsers";

/**
Limit to 1 instance to prevent issues
with the in-memory user store when scaling up.
It should be ok for the assignment.
Bad for production, but we are not doing production here.
*/
setGlobalOptions({ maxInstances: 1 });

// Seed the user store with initial users before handling any requests.
seedUsers();

import app from "./app";
export const api = onRequest(app);
