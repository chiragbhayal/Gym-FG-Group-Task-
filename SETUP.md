# Setup and Installation Guide

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB Atlas cluster URI or local MongoDB instance

## Environment Variables

Create a `.env` file in the `backend/` directory based on `backend/.env.example`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Variable Explanations
- `PORT`: Port number on which the backend Express server runs (default: 5000).
- `MONGODB_URI`: MongoDB connection string. Ensure your current IP is whitelisted in MongoDB Atlas Network Access.
- `JWT_SECRET`: Secret key used to sign and verify JSON Web Tokens.

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Running the Project

### Running Backend Server (Development)
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:5000`.

### Database Seeding (Optional)
To seed initial products, blogs, and an admin user:
```bash
cd backend
node seed.js
```
Default Admin Credentials created by seed script:
- Email: `admin@gym.com / chirag@gmail.com`
- Password: `password123 / 123456789`

### Running Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend application will run on `http://localhost:5173`.

### Interactive API Documentation
Access the built-in Swagger UI console at:
`http://localhost:5000/api/docs/`
