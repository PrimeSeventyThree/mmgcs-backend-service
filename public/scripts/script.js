/*
 * File: script.js
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 11:34:17 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 5:59:32 am
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

function showMessage(text, isError = false) {
    message.hidden = false;
    message.textContent = text;
    message.className = "message " + (isError ? "error" : "success");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    message.hidden = true;
    console.log("submitting login");
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
            showMessage(`Logged in as ${data.username}`);
            formContainer.hidden = true;
            formContainer.style.display = "none";
        } catch (error) {
            console.error("Login error:", error.name, error.message, error.stack);

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