/*
 * File: script.js
 * Project: backend-app
 * File Created: Saturday, 18th April 2026 11:34:17 pm
 * Author: Andrei Grichine (andrei.grichine@gmail.com)
 * -----
 * Last Modified: Sunday, 19th April 2026 3:14:03 pm
 * Modified By: Andrei Grichine (andrei.grichine@gmail.com>)
 * -----
 * Copyright 2026 - 2026, Andrei Grichine. All Rights Reserved.
 * This file is provided for evaluation purposes only.
 * See LICENSE.txt for full terms.
 * -----
 * HISTORY:
 */

const form = document.getElementById("login-form");
const message = document.getElementById("message");
const headerMessage = document.getElementById("header-message");
const logoutButton = document.getElementById("logout-button");
const profileButton = document.getElementById("profile-button")
let isClicked = false;

/*
 * Page load/refresh handler
 */
document.addEventListener("DOMContentLoaded", async () => {
    if (!sessionStorage.getItem("loggedIn")) {
        showLoggedOutState();
        return;
    }
    try {
        const user = await fetchCurrentUser();
        console.log("/me returned:", user.username);

        if (user) {
            showLoggedInState(user);
        } else {
            showLoggedOutState();
        }
    } catch (error) {
        showLoggedOutState();
        showMessage(`Failed to fetch current user`, true);
        console.error(`Error fetching current user: ${error.message}`, error);
    }
});

/**
 * User login handler
 */
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    message.hidden = true;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({ username, password })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error(`Login error: ${data.error}`);
            showMessage(data.error || "Login failed", true);
            return;
        }

        sessionStorage.setItem("loggedIn", "1");
        showLoggedInState(data);

    } catch (error) {
        if (error instanceof TypeError) {
            showMessage(`Network error: ${error.message}`, true);
        } else {
            showMessage("Request failed", true);
        }
    }
});

function showMessage(text, isError = false) {
    message.hidden = false;
    message.innerHTML = text;
    message.className = "message " + (isError ? "error" : "success");
}

function showLoggedInState(user) {
    headerMessage.textContent = `Welcome, ${user.username}!`;
    form.hidden = true;
    form.style.display = "none";
    logoutButton.hidden = false;
    profileButton.hidden = false;
}

function showLoggedOutState() {
    headerMessage.textContent = "Login";
    form.hidden = false;
    form.style.display = "flex";
    message.hidden = true;
    logoutButton.hidden = true;
    profileButton.hidden = true;
}

/**
 * Function to fetch currently logged in user profile
 */
async function fetchCurrentUser() {
    try {
        const response = await fetch("/me", {
            method: "GET",
            credentials: "same-origin"
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
            return null;
        }

        if (!response.ok) {
            showMessage(data.error || `Request failed: ${response.status}`, true);
            return null;
        }

        return data ?? null;

    } catch (error) {
        if (error instanceof TypeError) {
            showMessage(`Network error: ${error.message}`, true);
        } else {
            showMessage("Failed to fetch current user", true);
        }
        return null;
    }
}

/**
 * Logout handler
 */
async function logout() {
    let response;
    try {
        response = await fetch("/logout", {
            method: "POST",
            credentials: "same-origin"
        });
    } catch (error) {
        const errorMessage = `Logout request failed: ${error.message}`;
        showMessage(errorMessage, true);
        console.error(errorMessage, error.message);
        return null;
    }

    if (!response.ok) {
        const errorMessage = `Logout failed: ${response.status} ${response.statusText}`;
        showMessage(errorMessage, true);
        console.error(errorMessage, error.message)
    }
}

/*
 * Logout button handler
 */
logoutButton.addEventListener("click", async () => {
    try {
        await logout();
        sessionStorage.removeItem("loggedIn");
        showLoggedOutState();
        showMessage("Logged out");
        setTimeout(() => { message.hidden = true; }, 1000); //auto hide message
    } catch (error) {
        console.error(`Logout error: ${error}`);
        showMessage("Logout failed", true);
    }
});

/*
 * Show profile "toggle" button handler
 */
profileButton.addEventListener("click", async () => {
    isClicked = !isClicked;
    profileButton.textContent = isClicked ? 'Hide profile' : 'Show profile';

    if (!isClicked) {
        message.hidden = true;
        return;
    }

    try {
        const user = await fetchCurrentUser();
        if (user) {
            showMessage(`Your Profile:<br>email :${user.email}<br>roles:${user.roles.join(", ")}`);
        }
    } catch (error) {
        console.error(`Fetch user error: ${error}`);
        showMessage("Fetch user failed", true);
    }
});