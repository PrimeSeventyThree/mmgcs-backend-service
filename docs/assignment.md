# Coding challenge for applicants

## Overview

    This challenge is designed to evaluate your problem-solving ability and understanding of core development concepts. You will build a small web application based on the scenario and requirements below.
    **Warning:** AI usage for this test project is strictly prohibited. Anyone caught using AI will be automatically stripped of eligibility for job consideration.

## Part 2 — User Login Backend Service

Build a standalone backend authentication service with in-memory user storage and JWT-based session management.

### Endpoints

| Method | Path      | Description                                |
| ------ | --------- | ------------------------------------------ |
| `POST` | `/login`  | Authenticate a user and return a JWT token |
| `POST` | `/logout` | Invalidate the user's current token        |
| `GET`  | `/me`     | Return the authenticated user's profile    |

### Endpoint Specifications

#### `POST /login`

**Request body:**

```json
{
    "username": "string",
    "password": "string"
}
```

**Success response — 200 OK:**

```json
{
    "token": "<jwt_token>",
    "username": "string",
    "expiresIn": 3600
}
```

**Failure response — 401 Unauthorized:**

```json
{
    "error": "Invalid username or password"
}
```

---

#### `POST /logout`

**Headers:** `Authorization: Bearer <token>`

**Success response — 200 OK:**

```json
{
    "message": "Logged out successfully"
}
```

**Failure response — 401 Unauthorized:**

```json
{
    "error": "Invalid or expired token"
}
```

---

#### `GET /me`

**Headers:** `Authorization: Bearer <token>`

**Success response — 200 OK:**

```json
{
    "username": "string",
    "email": "string",
    "roles": ["string"]
}
```

**Failure response — 401 Unauthorized:**

```json
{
    "error": "Unauthorized"
}
```

---

### Technical Requirements

- **Tech stack:** Your choice — any language or framework.
- **Storage:** In-memory only. No database required. Pre-seed at least two users on startup.
- **Authentication:** JWT tokens. Token must be validated on protected endpoints (`/logout`, `/me`).
- **Logout:** Tokens must be invalidated server-side (i.e., a token blacklist or equivalent in memory).
- **Security:** Passwords must not be stored or returned in plain text.

### Deliverable

Provide at least two user stories for the login service scenario above. Use standard user story format and include acceptance criteria for each.

---

## Delivery Instructions

1. Zip your project with a `README.md` that includes instructions on how to run it locally.
2. If you can host your solution, provide the URL as well.
3. Submit both Part 1 and Part 2 together in a single delivery.

**Deadline: Friday, April 24th at 11:59 PM**
