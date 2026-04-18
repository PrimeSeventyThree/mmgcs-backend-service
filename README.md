# This repo is for the MMGSC backend and frontend assignment.

Quick note on the platform selected for this assignment: I've decided to use Firebase for the backend API because it allows quick set up of a serverless environment with minimal configuration. Compared to AWS with API gateway and Lambda, Firebase provides a more streamlined development experience, especially for small projects like this assignment.

### Part1: The frontend application

.....

### Part2: The backend API

The backend API is defined in the `api/backend-api.yaml` file. You can import this specification into postman, create collection and test the API against the live server.

## Using Firebase emulators for local development

To run the API locally, you have to install [Firebase CLI](https://firebase.google.com/docs/cli). You can install the Firebase CLI using the following command:

```
npm install firebase-tools
```

Then build the API:

```
npm run build
```

and start the emulators:

```
npm run serve
```

In another terminal, you can run curl commands to test the API:

```
curl -i http://localhost:5001/mmgsc/us-central1/api/
```

expected response:

```
HTTP/1.1 200 OK
x-powered-by: Express
vary: Origin
content-type: application/json; charset=utf-8
content-length: 15
etag: W/"f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
date: Sat, 18 Apr 2026 18:14:52 GMT
connection: keep-alive
keep-alive: timeout=5

{"status":"ok"}%
```
