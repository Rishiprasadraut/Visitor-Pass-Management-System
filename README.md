# 🚪 Visitor Pass Management System (MERN Backend)

A **production-ready Visitor Pass Management System** built using **Node.js, Express, MongoDB**, following **real company backend architecture** with authentication, role-based access, audit logs, reports, and search.

This project simulates how **Indian SaaS / HRTech / ERP products** manage visitors securely.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control (RBAC)
* Roles supported:

  * **ADMIN**
  * **SECURITY**
  * **EMPLOYEE**

---

### 👥 Visitor Management

* Create visitor entry (EMPLOYEE / SECURITY)
* Approve or reject visitors (ADMIN)
* Check-in visitors (SECURITY)
* Check-out visitors (SECURITY)
* Full visitor lifecycle tracking

---

### 🕵️ Audit Logs (Enterprise Feature)

* Logs every important action:

  * Approval
  * Rejection
  * Check-in
  * Check-out
* Stores:

  * Action performed
  * Old status → New status
  * User who performed the action
  * Timestamp

---

### 📜 Visitor History

* Complete status history per visitor
* Tracks:

  * Status changes
  * Who changed it
  * When it was changed

---

### 📊 Reports & Dashboard

* Total visitors
* Pending / Approved / Rejected
* Checked-in / Checked-out
* Today’s visitors count

---

### 🔍 Search & Pagination

* Search visitors by:

  * Name
  * Phone
  * Email
  * Purpose
* Filter by status
* Pagination support (page & limit)

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Security:** Role-based middleware
* **Tools:** Postman, Git, GitHub

---

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Visitor.js
│   │   └── AuditLog.js
│   ├── controllers/
│   │   ├── auth/
│   │   └── visitor/
│   ├── routes/
│   │   ├── auth/
│   │   └── visitor/
│   ├── middlewares/
│   │   ├── auth/
│   │   └── role/
│   ├── utils/
│   │   └── auditLogger.js
│   └── index.js
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Rishiprasadraut/Visitor-Pass-Management-System.git
cd Visitor-Pass-Management-System/server
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/visitor_pass_db
JWT_SECRET=your_jwt_secret
```

> ⚠️ `.env` is ignored via `.gitignore`

---

### 4️⃣ Run the server

```bash
npm run dev
```

Server will start on:

```
http://localhost:5000
```

---

## 🔐 Sample Users (for Testing)

### ADMIN

```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}
```

### SECURITY

```json
{
  "name": "Security Guard",
  "email": "security@test.com",
  "password": "123456",
  "role": "SECURITY"
}
```

### EMPLOYEE

```json
{
  "name": "Employee User",
  "email": "employee@test.com",
  "password": "123456",
  "role": "EMPLOYEE"
}
```

---

## 🧪 Sample Visitor Data

```json
{
  "name": "Amit Kumar",
  "phone": "9123456789",
  "email": "amit.kumar@gmail.com",
  "purpose": "Technical Interview"
}
```

---

## 🔑 API Flow (Important)

1. Login → Get JWT Token
2. Create Visitor (EMPLOYEE / SECURITY)
3. Approve / Reject (ADMIN)
4. Check-in (SECURITY)
5. Check-out (SECURITY)
6. View History & Audit Logs

---

## 🎯 Learning Outcomes

* Real-world backend architecture
* JWT authentication & RBAC
* Middleware-based security
* Audit logging & history tracking
* MongoDB schema design
* Search, filter & pagination
* Debugging production issues

---
