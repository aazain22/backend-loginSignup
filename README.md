Backend (Node.js)
The backend is located in the backend/ directory and is built with Node.js, Express, and MongoDB.

Key Files:
index.js: Entry point for the backend server.
Controllers:
authController.js: Handles login and signup logic.
Middlewares:
validation.js: Middleware for validating user input.
Models:
db.js: Configures the MongoDB connection.
user.js: Defines the user schema for MongoDB.
Routers:
authRouter.js: Manages authentication routes (login/signup).

Backend Setup
Navigate to the backend directory:
cd backend

npm install

MONGO_URI=your_mongodb_uri JWT_SECRET=your_jwt_secret

npm start
