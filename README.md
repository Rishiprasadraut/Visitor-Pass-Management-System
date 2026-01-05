# Visitor Pass Management System

**Visitor Pass Management System** is a simple Express + MongoDB application for managing visitor passes, users, and authentication.

## 🔧 Features

- User registration & login (JWT)
- Role-based users (ADMIN, SECURITY, EMPLOYEE)
- MongoDB (Mongoose) backend

## ⚙️ Prerequisites

- Node.js (>=16)
- MongoDB running locally or accessible via connection string

## 🚀 Quickstart

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file from the example and set values:

```bash
cp .env.example .env
# Or create .env and add:
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/visitor_pass_db
# JWT_SECRET=your_jwt_secret_here
```

3. Run in development:

```bash
cd server
npm run dev
```

The app listens on `PORT` (default from `.env` or 3000).

## 🗄️ Environment Variables

- `PORT` — Port for the server
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret used to sign JWTs



## 📄 License

MIT

---

If you want, I can commit and push this `README.md` for you, or also purge `.env` from history now.
