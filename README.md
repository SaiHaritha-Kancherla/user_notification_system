# User Notification Preferences API

This project implements a serverless API for managing user notification preferences and simulating notification delivery. It handles CRUD operations for user preferences, notification sending, and retrieval of logs/statistics.

## Features

- **User Preferences Management**  
  Create, read, update, and delete notification preferences.

- **Notification Management**  
  Simulate notification delivery and track logs.

- **Validation**  
  Input validation for emails, timezones, enums, and required fields.

- **Rate Limiting**  
  Basic rate limiting for API endpoints.

- **Error Handling**  
  Proper error responses with meaningful status codes.

- **Logging**  
  Request and notification event logging.

- **Testing**  
  Unit and integration tests for services, validation, and database operations.

- **Serverless Deployment**  
  Hosted on Vercel for scalable, serverless execution.

## API Endpoints

### User Preferences

- **POST /api/preferences**  
  Create user preferences.  
  Example request body:
  ```json
  {
    "userId": "user123",
    "email": "user@example.com",
    "preferences": {
      "marketing": true,
      "newsletter": false,
      "updates": true,
      "frequency": "weekly",
      "channels": {
        "email": true,
        "sms": false,
        "push": true
      }
    },
    "timezone": "America/New_York"
  }
  ```
  Example response:
  ```json
  {
    "message": "User preferences created successfully"
  }
  ```

- **GET /api/preferences/:userId**  
  Retrieve user preferences.

- **PATCH /api/preferences/:userId**  
  Update user preferences.

- **DELETE /api/preferences/:userId**  
  Delete user preferences.

### Notification Management

- **POST /api/notifications/send**  
  Send a notification.  
  Example request body:
  ```json
  {
    "userId": "user123",
    "type": "marketing",
    "channel": "email",
    "content": {
      "subject": "Special Offer",
      "body": "Check out our latest deals!"
    }
  }
  ```
  Example response:
  ```json
  {
    "message": "Notification sent successfully"
  }
  ```

- **GET /api/notifications/:userId/logs**  
  Retrieve notification logs.

- **GET /api/notifications/stats**  
  Get notification statistics.

## Setup Instructions

### Prerequisites

- Node.js >= 18
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory with the following keys:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     PORT=3000
     RATE_LIMIT_WINDOW=60
     RATE_LIMIT_MAX=100
     ```

4. Run the application:
   ```
   npm run start:dev
   ```

## Testing

- **Run Unit Tests**:
  ```
  npm run test
  ```

- **Run Integration Tests**:
  ```
  npm run test:integration
  ```

## Deployment Guide

### Vercel Deployment

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy the project:
   ```
   vercel --prod
   ```

3. Verify the deployment URL in the Vercel dashboard.

## Environment Variables

| Variable           | Description                             |
|--------------------|-----------------------------------------|
| `MONGO_URI`        | MongoDB connection string              |
| `PORT`             | Application port (default: 3000)       |
| `RATE_LIMIT_WINDOW`| Time window for rate limiting (sec)    |
| `RATE_LIMIT_MAX`   | Maximum requests per time window       |

## Project Structure

```
src/
├── app.module.ts         # Root module
├── main.ts               # Application entry point
├── preferences/          # User preferences feature
│   ├── preferences.controller.ts
│   ├── preferences.service.ts
│   ├── preferences.schema.ts
├── notifications/        # Notification feature
│   ├── notifications.controller.ts
│   ├── notifications.service.ts
│   ├── notifications.schema.ts
└── common/               # Shared utilities and middleware
```

## API Documentation

API documentation is available via Swagger at `/api/docs` after starting the application.

## Example Requests

### Create User Preferences

```bash
curl -X POST http://localhost:3000/api/preferences \
-H "Content-Type: application/json" \
-d '{
  "userId": "user123",
  "email": "user@example.com",
  "preferences": {
    "marketing": true,
    "newsletter": false,
    "updates": true,
    "frequency": "weekly",
    "channels": {
      "email": true,
      "sms": false,
      "push": true
    }
  },
  "timezone": "America/New_York"
}'
```

### Send Notification

```bash
curl -X POST http://localhost:3000/api/notifications/send \
-H "Content-Type: application/json" \
-d '{
  "userId": "user123",
  "type": "marketing",
  "channel": "email",
  "content": {
    "subject": "Special Offer",
    "body": "Check out our latest deals!"
  }
}'
```

## Submission

- **GitHub Repository**: https://github.com/SaiHaritha-Kancherla/user_notification_system
- **Deployed API URL**: https://user-notification-system.vercel.app/?vercelToolbarCode=Ubeiln49wv0lUBS
- **Example Requests and Responses**: Provided above.
## Sample Output Images 


