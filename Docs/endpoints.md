# API Endpoints

## GET /isAdmin

**Description:** Checks if a user is an admin.

**Query parameters:** `userId` (string) - The ID of the user.

**Response:** Boolean indicating whether the user is an admin or not.

## GET /findPostAccident

**Description:** Retrieves all Post Accident Forms.

**Response:** Array of Post Accident Forms.

## GET /findPostIncident

**Description:** Retrieves all Post Incident Forms.

**Response:** Array of Post Incident Forms.

## GET /findReasonableCause

**Description:** Retrieves all Reasonable Cause Forms.

**Response:** Array of Reasonable Cause Forms.

## POST /newUser

**Description:** Creates a new user.

**Body parameters:** `idNumber` (string), `emailAddress` (string)

**Response:** HTTP status code 200.

## POST /postAccident

**Description:** Creates a new Post Accident Form.

**Body parameters:** Various form fields.

**Response:** HTTP status code 200.

## POST /postAccident/:updateStatus

**Description:** Updates the status of a Post Accident Form.

**Path parameters:** `updateStatus` (string) - The new status.

**Body parameters:** `id` (string) - The ID of the form to update.

**Response:** HTTP status code 200.

## POST /postIncident

**Description:** Creates a new Post Incident Form.

**Body parameters:** Various form fields.

**Response:** HTTP status code 200.

## POST /postIncident/:updateStatus

**Description:** Updates the status of a Post Incident Form.

**Path parameters:** `updateStatus` (string) - The new status.

**Body parameters:** `id` (string) - The ID of the form to update.

**Response:** HTTP status code 200.

## POST /reasonableCause

**Description:** Creates a new Reasonable Cause Form.

**Body parameters:** Various form fields.

**Response:** HTTP status code 200.

## POST /reasonableCause/:updateStatus

**Description:** Updates the status of a Reasonable Cause Form.

**Path parameters:** `updateStatus` (string) - The new status.

**Body parameters:** `id` (string) - The ID of the form to update.

**Response:** HTTP status code 200.

## GET /db

**Description:** Retrieves all users.

**Response:** Array of users.