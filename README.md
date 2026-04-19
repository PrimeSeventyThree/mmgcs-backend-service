# This repo is for the MMGSC backend and frontend assignment.

### Part1: The frontend application

.....

### Part2: The backend API

Quick note on the platform selected for this assignment: I've decided to use Firebase for the backend API because it allows quick set up of a serverless environment with minimal configuration. Compared to AWS with API gateway and Lambda, Firebase provides a more streamlined development experience, especially for small projects like this assignment.

Live backend service is available at https://mmgsc-demo.web.app/

## TL;DR

Clone repo → install deps → set env → build → run Firebase emulators → test endpoints.

The backend API is defined in the `api/backend-api.yaml` file. You can import this specification into postman, create collection and test the API against the live server. Before using Postman, make sure the API is running locally (see below instructions), or use hosted live backend service (https://mmgsc-demo.web.app/)

---

## 1. Prerequisites

Ensure you have installed:

- Node.js (v24 recommended)
- npm
- Git
- Firebase CLI

Install Firebase CLI globally:

```bash
npm install -g firebase-tools
```

Verify:

```bash
firebase --version
```

---

## 2. Get the Project

### Option A — Clone

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### Option B — Unzip

```bash
unzip project.zip
cd <project-folder>
```

---

## 3. Install Dependencies

```bash
cd functions
npm install
```

---

## 4. Configure Environment Variables

The API uses environment variables for configuration. Seed credentials are supplied via environment variables as well. The application hashes passwords with bcrypt before loading users into the in-memory store. Password are never stored or returned in plaintext. The env vars themselves are treated as ephemeral seed values and discarded after initialization. See `seedUsers` function for the implementation details.

Current approach for this assignment (plaintext in env → hash at startup) is acceptable because:

- Simplifies test users management (no need to hash passwords manually)
- The env var is a seed/config value, not a stored credential
- It gets hashed before it ever touches the memory store
- The runtime state contains only password hashes
- The plaintext password entries are removed from process memory after initialization

Having said that, stricter interpretation of the **security requirements** (pre-hashed in env or use a dedicated secret management service) is better in production.

You can set these variables in a `.env` file inside `functions` directory. The required variables are:

```
JWT_SECRET=this-is-my-long-and-secure-secret-key-that-should-be-replaced-in-prod-with-a-stronger-one
JWT_EXPIRES_IN=3600
AUTH_COOKIE_NAME=__session
AUTH_COOKIE_SECURE=false

USER1_EMAIL=user@example.com
USER1_NAME=Test User
USER1_ROLES=user
USER1_PASSWORD="password123"

USER2_EMAIL=admin@example.com
USER2_NAME=Admin User
USER2_ROLES=admin
USER2_PASSWORD="password456"
```

## Platform Note (Important)

When using Firebase Hosting together with Cloud Functions or Cloud Run, cookies are generally stripped from incoming requests. This is necessary to allow for efficient CDN cache behavior.

> Only the specially-named `__session` cookie is forwarded to the backend.

This means:

- Auth cookie (AUTH_COOKIE_NAME) **must be named `__session`**
- Otherwise `/me` and `/logout` endpoints will fail in production

Reference:
https://firebase.google.com/docs/hosting/manage-cache

## 5. Build the Project

```bash
npm run build
```

Expected: `lib/` directory created.

---

## 6. Start Firebase Emulators

```bash
npm run serve
```

Expected output:

```bash
✔  functions: Using node@24 from host.
i  functions: Loaded environment variables from .env.
Serving at port 8913

Seeding users...

Adding user: Test User
Adding user: Admin User

Seeded users: [ 'user@example.com', 'admin@example.com' ]

✔  functions: Loaded functions definitions from source: api.
✔  functions[us-central1-api]: http function initialized (http://127.0.0.1:5001/mmgsc-demo/us-central1/api).

┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/               │
└─────────────────────────────────────────────────────────────┘

┌───────────┬────────────────┬─────────────────────────────────┐
│ Emulator  │ Host:Port      │ View in Emulator UI             │
├───────────┼────────────────┼─────────────────────────────────┤
│ Functions │ 127.0.0.1:5001 │ http://127.0.0.1:4000/functions │
├───────────┼────────────────┼─────────────────────────────────┤
│ Hosting   │ 127.0.0.1:5002 │ n/a                             │
└───────────┴────────────────┴─────────────────────────────────┘
```

---

## 7. Verify Service Health

Note the port number "hosting" service is using (5002 in this case - see above) and adjust accordingly commands below.

```bash
curl -i http://localhost:5002/health
```

Expected:

```json
{ "status": "ok" }
```

---

## 8. Test Authentication Endpoints

### 8.1 Login

```bash
curl -i -X POST http://localhost:5002/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Test User","password":"password123"}'
```

Expected:

- 200 OK

```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....", "username": "Test User", "expiresIn": 3600 }
```

---

### 8.2 Get Current User

```bash
curl -i http://localhost:5002/me \
  -H "Cookie: __session=<token>"
```

Expected:

```json
{ "username": "Test User", "email": "user@example.com", "roles": ["user"] }
```

---

### 8.3 Logout

```bash
curl -i -X POST http://localhost:5002/logout \
  -H "Cookie: __session=<token>"
```

Expected:

```json
{ "message": "Logged out successfully" }
```

---

### 8.4 Verify Logout

```bash
curl -i http://localhost:5002/me
```

Expected:

```json
{ "error": "Unauthorized" }
```

---

## 9 Two user stories

### 9.1 User Story 1

Title
User logs in to access their session

Story
As a registered user, I want to log in with my email and password so that I can access authenticated parts of the application.

Acceptance Criteria

- Given a valid email and password, when I send a POST /login request, then I receive a success response with my basic user profile.
- Given valid credentials, when login succeeds, then the backend sets a signed JWT session cookie.
- Given an invalid email or password, when I send a POST /login request, then I receive 401 Unauthorized.
- Given a malformed request body, when I omit required fields, then I receive 400 Bad Request.
- Given a successful login, when I later call GET /me, then I receive my authenticated user information.

### 9.2 User Story 2

Title
User checks and ends their current session

Story
As an authenticated user, I want to view my current session and log out so that I can confirm who is signed in and safely end access on my device.

Acceptance Criteria

- Given a valid authenticated session, when I call GET /me, then I receive my current user profile.
- Given no session or an invalid/expired JWT, when I call GET /me, then I receive 401 Unauthorized.
- Given an authenticated session, when I send a POST /logout request, then the backend clears the session cookie.
- Given I have logged out, when I call GET /me, then I receive 401 Unauthorized.
- Given logout is called multiple times, when no valid session exists, then the endpoint still responds safely without exposing internal details.

## 10. Common Issues

### Cookies missing in /me

- Ensure cookie name is `__session`

### Env not loaded

- Restart emulator after changes

---

## 11. Optional: Run Tests

```bash
npm test
```

---
