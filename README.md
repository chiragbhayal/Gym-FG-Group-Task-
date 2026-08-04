# FlexFit Gym Management Web Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed for gym management, member fitness exploration, supplement purchasing, inquiry submission, and administrative management.

## Overview

FlexFit allows users to explore gym facilities, read fitness blogs, browse and order gym supplements with delivery address tracking, and submit membership inquiries. The platform provides a secured admin dashboard allowing gym administrators to manage users, orders, supplement inventory, blog posts, and membership inquiries.

## Tech Stack

### Frontend
- React.js (Vite)
- TailwindCSS
- Lucide React Icons
- React Router DOM

### Backend
- Node.js & Express.js
- MongoDB & Mongoose ORM
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password encryption
- Swagger UI (`swagger-ui-express` & `swagger-jsdoc`) for interactive API documentation

## Architecture Overview

```
Gym/
├── backend/
│   ├── config/          # Database & Swagger configurations
│   ├── controllers/     # Express route handlers
│   ├── middleware/      # Auth & Admin route protection
│   ├── models/          # Mongoose data schemas (User, Product, Blog, Inquiry, Order)
│   ├── routes/          # API route definitions
│   ├── seed.js          # Database initial seed script
│   └── server.js        # Express app entry point
└── frontend/
    ├── src/
    │   ├── assets/      # Static image assets
    │   ├── components/  # Reusable UI components (Navbar, Hero, Footer, etc.)
    │   ├── context/     # AuthContext state management
    │   ├── pages/       # Application views (Home, Login, Register, Shop, Blogs, Inquiry, Dashboard)
    │   └── App.jsx      # Top-level routing & route guards
    └── vite.config.js   # Vite dev server & proxy configuration
```

## Features

- User Authentication (Registration, Login, JWT session persistence, password visibility toggle)
- Interactive Supplement Shop with shipping address entry and user order tracking
- Fitness Blogs database with full article viewing modal
- Gym Membership Inquiry Submission system
- Protected Admin Dashboard with parallel data fetching for managing:
  - User accounts list
  - Inquiries list and removal
  - Supplement inventory (Create, Read, Update, Delete)
  - Blog posts (Create, Read, Update, Delete)
  - Order status tracking (Pending, Shipped, Delivered)
- Production Health Check endpoint (`GET /api/health`)
- Built-in Interactive Swagger API Documentation (`GET /api/docs/`)

## API Documentation

Interactive OpenAPI/Swagger documentation is available directly through the browser when running the backend:
- `http://localhost:5000/api/docs/`
