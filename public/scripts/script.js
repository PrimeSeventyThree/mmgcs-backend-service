/*
 * File: script.js
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 11:34:17 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 8:03:43 am
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

const form = document.getElementById("login-form");
const formContainer = document.getElementById("form-container");
const message = document.getElementById("message");
const headerMessage = document.getElementById("header-message");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const user = await fetchCurrentUser();
        console.log("/me returned:", user);

        if (user) {
            showLoggedInState(user);
        }
    } catch (error) {
        showMessage(`Failed to fetch current user`, true);
        console.error(`Error fetching current user: ${error.message}`, error);
    }
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    message.hidden = true;
    // console.log("submitting login");
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({
                username,
                password
            })
        });

        try {
            // console.log("login response status", response.status);
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                showMessage(data.error || "Login failed", true);
                return;
            }
            // console.log("Login successful:", data);
            if (data) {
                showLoggedInState(data);
                return;
            }
        } catch (error) {
            console.error(`Login error: ${error.name}, ${error.message}, ${error.stack}`);

            if (error instanceof TypeError) {
                showMessage(`Network error: ${error.message}`, true);
            } else {
                showMessage("Login failed", true);
            }
        }
    } catch (error) {
        showMessage("Request failed", true);
    }
});

function showMessage(text, isError = false) {
    message.hidden = false;
    message.textContent = text;
    message.className = "message " + (isError ? "error" : "success");
}

function showLoggedInState(user) {
    showMessage(`Your email is ${user.email}`);
    headerMessage.textContent = `Welcome, ${user.username}!`;
    formContainer.hidden = true;
    formContainer.style.display = "none";
}

async function fetchCurrentUser() {
    let response;

    try {
        response = await fetch("/me", {
            method: "GET",
            credentials: "same-origin"
        });
    } catch (error) {
        const errorMessage = `Failed to fetch current user: ${error.message}`;
        showMessage(errorMessage, true);
        console.error(errorMessage, error.message);
        return null;
    }

    if (response.status === 401) {
        return null;
    }

    if (!response.ok) {
        console.error();
        const errorMessage = `Unexpected response fetching current user: ${response.status} ${response.statusText}`;
        showMessage(errorMessage, true);
        console.error(errorMessage, error.message);
        return null;
    }

    try {
        const data = await response.json();
        return data ?? null;
    } catch (parseError) {
        const errorMessage = `Failed to parse user JSON: ${parseError.message} ${response.statusText}`;
        showMessage(errorMessage, true);
        console.error(errorMessage, error.message);
        return null;
    }
}

