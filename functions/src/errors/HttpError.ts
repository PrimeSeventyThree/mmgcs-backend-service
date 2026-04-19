/*
 * File: HttpError.ts
 * Project: backend-app
 * File Created: Sunday, 19th April 2026 1:41:50 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 3:23:38 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

/**
 * Base application error that carries an HTTP status code alongside the error message.
 *
 * Use this as the parent class for errors that should be translated directly
 * into HTTP responses.
 */
export class HttpError extends Error {
    /**
     * Creates a new HTTP-aware error.
     *
     * @param {number} statusCode HTTP status code to return to the client.
     * @param {string} message Human-readable error message.
     */
    constructor(
        public readonly statusCode: number,
        message: string
    ) {
        super(message);
        this.name = "HttpError";
    }
}

/**
 * HTTP 400 Bad Request.
 */
export class BadRequestError extends HttpError {
    /**
     * Creates a 400 Bad Request error.
     *
     * @param {string} message Bad request error message.
     */
    constructor(message = "Email and password are required") {
        super(400, message);
        this.name = "BadRequestError";
    }
}

/**
 * HTTP 401 Bad Request.
 */
export class AuthError extends HttpError {
    /**
     * Creates a 401 Bad Request error.
     *
     * @param {string} message Bad request error message.
     */
    constructor(message = "Invalid username or password") {
        super(401, message);
        this.name = "AuthError";
    }
}

/**
 * Not Found Error
 */
export class NotFoundError extends HttpError {
    /**
     * Creates a not found error.
     *
     * @param {string} message Not found error message.
     */
    constructor(message = "User not found") {
        super(401, message);
        this.name = "NotFoundError";
    }
}
