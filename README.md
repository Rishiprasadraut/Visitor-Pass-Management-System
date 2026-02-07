# 🏢 Visitor Pass Management System

A full-stack **MERN** application for managing visitor access in organizations. Features role-based access control, real-time status tracking, audit logging, comprehensive reporting, and secure visitor workflow management.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#️-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Role Permissions](#-role-permissions)
- [Security Features](#-security-features)
- [Sample Data](#-sample-data)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Three roles (ADMIN, SECURITY, EMPLOYEE)
- **Protected Routes**: Frontend and backend route protection
- **Persistent Sessions**: Auto-login with localStorage
- **Password Security**: bcrypt hashing with salt rounds
- **Token Validation**: Middleware-based authentication checks
- **Profile Management**: User can view and manage their profile

### 👥 Visitor Management
| Feature | Description |
|---------|-------------|
| Create Visitor | Employees/Security can register visitors |
| Approve/Reject | Admins can approve or reject visitor requests |
| Check-In | Security marks visitor arrival |
| Check-Out | Security marks visitor departure |
| Status Tracking | Real-time status updates |

### 📊 Dashboard Analytics
- **Real-time Stats**: Live visitor counts and status tracking
- **Total Visitors**: Complete visitor count
- **Pending Approvals**: Visitors awaiting approval
- **Today's Visitors**: Daily visitor count
- **Status Breakdown**: Approved, Rejected, Checked-in, Checked-out
- **Role-based Views**: Different data for different roles
- **Beautiful UI**: Modern card-based dashboard with Lucide icons

### 🔍 Advanced Search & Filtering
- Search by name, phone, email, or purpose
- Filter by status
- Paginated results
- Real-time search updates

### 📈 Reports & History
- **Status Reports**: Filter visitors by status
- **Date Reports**: Get visitors within date range
- **Visitor History**: Complete timeline of status changes per visitor

### 🕵️ Audit Logs
- Track all critical actions
- User attribution for each action
- Timestamp and status transitions
- Compliance-ready logging

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Redux Toolkit | State Management |
| React Router v6 | Navigation |
| Axios | HTTP Client |
| Tailwind CSS | Styling |
| Lucide React | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|y
| Node.js | 18+ | JavaScript Runtime |
| Express.js | 4.x | Web Framework |
| MongoDB | 6+ | NoSQL Database |
| Mongoose | 8.x | MongoDB ODM |
| JWT | - | Token Authentication |
| bcryptjs | - | Password Hashing |
| Helmet | - | Security Headers |
| CORS | - | Cross-Origin Support |
| dotenv | - | Environment Variables |

---

## 📁 Project Structure

```
visitor-pass-management-system/
│
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                # API service functions
│   │   │   ├── authApi.js
│   │   │   ├── visitorApi.js
│   │   │   ├── dashboardApi.js
│   │   │   ├── auditApi.js
│   │   │   └── searchApi.js
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AuthLoader.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Visitors.jsx
│   │   │   ├── CreateVisitor.jsx
│   │   │   ├── AuditLogs.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── VisitorHistory.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── dashboardSlice.js
│   │   │       └── visitorSlice.js
│   │   ├── utils/
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth/
│   │   │   │   └── controller.js
│   │   │   └── visitor/
│   │   │       └── controller.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js
│   │   │   ├── validate.js
│   │   │   └── auth/
│   │   │       ├── middleware.js
│   │   │       └── role.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Visitor.js
│   │   │   └── AuditLog.js
│   │   ├── routes/
│   │   │   ├── auth/
│   │   │   │   └── routes.js
│   │   │   └── visitor/
│   │   │       └── routes.js
│   │   ├── utils/
│   │   │   └── auditLogger.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** Community Edition ([Download](https://www.mongodb.com/try/download/community)) or MongoDB Atlas account
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/visitor-pass-management-system.git
cd visitor-pass-management-system
```

### 2️⃣ Backend Setup

Navigate to server directory and install dependencies:

```bash
cd server
npm install
```

Create `.env` file in `/server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/visitor-management
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` to a strong random string in production!

### 3️⃣ Frontend Setup

Open a new terminal, navigate to client directory:

```bash
cd client
npm install
```

Create `.env` file in `/client` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4️⃣ Database Setup

**Option A: Local MongoDB**

1. Start MongoDB service:
   ```bash
   # Windows (run as administrator)
   net start MongoDB
   
   # macOS (using Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. Verify connection:
   ```bash
   mongosh
   # Should connect successfully
   ```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/visitor-management?retryWrites=true&w=majority
   ```

---

## 🎯 Running the Application

### Development Mode

**Backend (Terminal 1):**
```bash
cd server
npm run dev
```
Backend will run on: `http://localhost:5000`

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```
Frontend will run on: `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

### Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **MongoDB**: mongodb://localhost:27017

---

## ⚙️ Environment Variables

### Backend (`/server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/visitor-db` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |

### Frontend (`/client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-api-url.com/api
```

### Authentication Routes

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| `POST` | `/auth/register` | Register new user | Yes | ADMIN |
| `POST` | `/auth/login` | User login | No | Public |
| `GET` | `/auth/profile` | Get user profile | Yes | All |

**Example: Login**
```javascript
// Request
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "Admin@123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Example: Register**
```javascript
// Request
POST /api/auth/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New User",
  "email": "user@test.com",
  "password": "SecurePass123",
  "role": "EMPLOYEE"
}

// Response
{
  "message": "User registered successfully",
  "userId": "65f1a2b3c4d5e6f7g8h9i0j1"
}
```

### Visitor Management Routes

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| `POST` | `/visitors` | Create visitor | Yes | EMPLOYEE, SECURITY |
| `GET` | `/visitors` | Get all visitors | Yes | ADMIN, SECURITY |
| `POST` | `/visitors/search` | Search & filter visitors | Yes | ADMIN, SECURITY |
| `PATCH` | `/visitors/:id/status` | Approve/Reject | Yes | ADMIN, SECURITY |
| `PATCH` | `/visitors/:id/check-in` | Check-in visitor | Yes | SECURITY |
| `PATCH` | `/visitors/:id/check-out` | Check-out visitor | Yes | SECURITY |
| `PATCH` | `/visitors/:id` | Update visitor details | Yes | ADMIN |
| `DELETE` | `/visitors/:id` | Delete visitor | Yes | ADMIN |
| `GET` | `/visitors/:id/history` | Get visitor history | Yes | ADMIN, SECURITY |

**Example: Create Visitor**
```javascript
// Request
POST /api/visitors
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "purpose": "Business Meeting"
}

// Response
{
  "message": "Visitor created successfully",
  "visitor": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "purpose": "Business Meeting",
    "host": "65f0a1b2c3d4e5f6g7h8i9j0",
    "status": "PENDING",
    "createdAt": "2026-02-07T10:30:00.000Z"
  }
}
```

**Example: Search Visitors**
```javascript
// Request
POST /api/visitors/search
Authorization: Bearer <token>
Content-Type: application/json

{
  "search": "john",
  "status": "PENDING",
  "page": 1,
  "limit": 10
}

// Response
{
  "visitors": [...],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

**Example: Approve Visitor**
```javascript
// Request
PATCH /api/visitors/65f1a2b3c4d5e6f7g8h9i0j1/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "APPROVED"
}

// Response
{
  "message": "Status APPROVED Updated Successfully",
  "visitor": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "status": "APPROVED",
    "history": [
      {
        "status": "PENDING",
        "changedAt": "2026-02-07T10:30:00.000Z",
        "changedBy": "65f0..."
      },
      {
        "status": "APPROVED",
        "changedAt": "2026-02-07T10:45:00.000Z",
        "changedBy": "65f0..."
      }
    ]
  }
}
```

### Dashboard & Reports Routes

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| `GET` | `/visitors/dashboard` | Get dashboard stats | Yes | ADMIN, SECURITY |
| `POST` | `/visitors/reports/status` | Report by status | Yes | ADMIN, SECURITY |
| `POST` | `/visitors/reports/date` | Report by date range | Yes | ADMIN, SECURITY |
| `GET` | `/visitors/audit/logs` | Get audit logs | Yes | ADMIN |

**Example: Dashboard Stats**
```javascript
// Request
GET /api/visitors/dashboard
Authorization: Bearer <token>

// Response
{
  "total": 150,
  "pending": 12,
  "approved": 8,
  "rejected": 5,
  "checkIn": 3,
  "checkOut": 122,
  "todayVisitors": 15
}
```

**Example: Status Report**
```javascript
// Request
POST /api/visitors/reports/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "APPROVED"
}

// Response
{
  "visitors": [
    {
      "_id": "65f1...",
      "name": "John Doe",
      "status": "APPROVED",
      "createdAt": "2026-02-07T10:30:00.000Z"
    },
    // ... more visitors
  ]
}
```

**Example: Date Range Report**
```javascript
// Request
POST /api/visitors/reports/date
Authorization: Bearer <token>
Content-Type: application/json

{
  "from": "2026-02-01",
  "to": "2026-02-07"
}

// Response
{
  "visitors": [...]
}
```

### Error Responses

**400 Bad Request**
```json
{
  "message": "Invalid Status"
}
```

**401 Unauthorized**
```json
{
  "message": "Unauthorized access"
}
```

**403 Forbidden**
```json
{
  "message": "Access Denied"
}
```

**404 Not Found**
```json
{
  "message": "Visitor not Found"
}
```

**500 Internal Server Error**
```json
{
  "message": "Server error"
}
```

---

## 🧑‍💼 Role Permissions

| Feature | ADMIN | SECURITY | EMPLOYEE |
|---------|:-----:|:--------:|:--------:|
| View Dashboard | ✅ | ✅ | ❌ |
| Create Visitor | ❌ | ✅ | ✅ |
| Approve/Reject | ✅ | ✅ | ❌ |
| Check-in | ❌ | ✅ | ❌ |
| Check-out | ❌ | ✅ | ❌ |
| View Audit Logs | ✅ | ❌ | ❌ |
| Generate Reports | ✅ | ✅ | ❌ |
| View Visitor History | ✅ | ✅ | ❌ |
| View Profile | ✅ | ✅ | ✅ |

---

## 📸 Screenshots

### Dashboard
> Real-time analytics with status cards showing total visitors, pending approvals, and today's check-ins

### Visitor Management
> Search, filter, and manage visitors with one-click actions

### Audit Logs
> Timeline view of all security actions with user attribution

### Reports
> Generate reports filtered by status or custom date ranges

### Visitor History
> Complete timeline showing all status changes for a specific visitor

---

## 🧪 Sample Data

### Default Test Users

Use these credentials to test different role functionalities:

#### 👑 ADMIN Account
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}
```
**Access**: Full system access, can manage users, view audit logs, approve/reject visitors

#### 🛡️ SECURITY Account
```json
{
  "name": "Security Guard",
  "email": "security@test.com",
  "password": "123456",
  "role": "SECURITY"
}
```
**Access**: Dashboard, visitor management, check-in/out operations, create visitors

#### 👤 EMPLOYEE Account
```json
{
  "name": "Employee User",
  "email": "employee@test.com",
  "password": "123456",
  "role": "EMPLOYEE"
}
```
**Access**: Create visitors for meetings, view own profile

### Sample Visitor Data

```json
{
  "name": "Amit Kumar",
  "phone": "9876543210",
  "email": "amit.kumar@gmail.com",
  "purpose": "Technical Interview - Software Engineer Position"
}
```

```json
{
  "name": "Priya Sharma",
  "phone": "9123456789",
  "email": "priya.sharma@company.com",
  "purpose": "Business Meeting with Sales Team"
}
```

```json
{
  "name": "Rahul Verma",
  "phone": "9998887776",
  "email": "rahul.v@vendor.com",
  "purpose": "Equipment Maintenance and Installation"
}
```

### Creating Test Data

You can use these cURL commands to create test data:

**Create Visitor (requires authentication)**:
```bash
curl -X POST http://localhost:5000/api/visitors \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Visitor",
    "phone": "9876543210",
    "email": "test@example.com",
    "purpose": "Testing the system"
  }'
```

**Register User (requires ADMIN token)**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Employee",
    "email": "newemployee@test.com",
    "password": "NewPass@123",
    "role": "EMPLOYEE"
  }'
```

### Password Requirements

⚠️ **All passwords must contain:**
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)

Examples of **valid** passwords:
- `Admin@123`
- `SecurePass1`
- `MyPassword2024`

Examples of **invalid** passwords:
- `admin123` (no uppercase, no special char)
- `ADMIN123` (no lowercase)
- `Admin@abc` (no number)

---

## � Security Features

### Backend Security
- **JWT Authentication**: Secure token-based authentication with expiration
- **Password Hashing**: bcrypt with salt rounds (10)
- **Password Validation**: Minimum 8 characters, must contain uppercase, lowercase, and numbers
- **Helmet.js**: Sets various HTTP headers for security
- **CORS**: Configured for specific origins only
- **Role-Based Middleware**: Multi-layer authorization checks
- **MongoDB Injection Protection**: Mongoose schema validation
- **Environment Variables**: Sensitive data stored in .env files

### Frontend Security
- **Protected Routes**: Components wrapped with authentication check
- **Token Storage**: Secure localStorage with automatic cleanup
- **Role-Based Rendering**: UI elements hidden based on user role
- **Auto-logout**: On token expiration or invalid session
- **Input Validation**: Client-side form validation

### Audit Trail
- **Complete Logging**: All CRUD operations logged
- **User Attribution**: Every action linked to user
- **Timestamp Tracking**: Precise time of each action
- **Status Transitions**: Before and after states recorded
- **Compliance Ready**: Suitable for regulatory requirements

---

## 🛠 Troubleshooting

### Common Issues

#### **MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**:
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl status mongod
   ```
2. Verify connection string in `.env`
3. Check MongoDB port (default: 27017)

#### **Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Unix/Mac
lsof -i :5000
kill -9 <PID>
```

#### **CORS Error in Browser**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**:
1. Check CORS configuration in `server/src/index.js`
2. Ensure frontend URL is in allowed origins
3. Verify API base URL in client `.env`

#### **Token Expired or Invalid**
**Solution**:
1. Logout and login again
2. Clear localStorage in browser
3. Check JWT_SECRET matches in both environments

#### **Module Not Found**
```
Error: Cannot find module 'express'
```
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

**Enable detailed logging**:

Backend:
```javascript
// server/src/index.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

Frontend:
```javascript
// Check Redux state
console.log(store.getState());
```

---

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Prepare for deployment**:
   ```bash
   cd server
   npm install
   ```

2. **Update environment variables** on hosting platform:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/visitor-db
   JWT_SECRET=your_production_secret_key_32_chars_min
   NODE_ENV=production
   ```

3. **Add start script** in `package.json`:
   ```json
   {
     "scripts": {
       "start": "node src/index.js",
       "dev": "nodemon src/index.js"
     }
   }
   ```

4. **Deploy**:
   - **Render**: Connect GitHub repo, select branch, deploy
   - **Railway**: Connect repo, auto-deploy on push
   - **Heroku**: `git push heroku main`

### Frontend Deployment (Vercel/Netlify)

1. **Build the app**:
   ```bash
   cd client
   npm run build
   ```

2. **Update API URL**:
   ```env
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```

3. **Deploy**:
   - **Vercel**: 
     ```bash
     npm i -g vercel
     vercel
     ```
   - **Netlify**:
     ```bash
     npm i -g netlify-cli
     netlify deploy --prod
     ```

4. **Configure CORS** in backend for production URL:
   ```javascript
   // server/src/index.js
   app.use(cors({
     origin: [
       "https://your-frontend-url.vercel.app",
       "http://localhost:5173"
     ],
     credentials: true
   }));
   ```

### Environment-Specific Configuration

**Development**:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Production**:
```env
VITE_API_BASE_URL=https://api.yourproduction.com/api
```

---

## 🔄 Visitor Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   PENDING   │───▶│  APPROVED   │───▶│ CHECKED_IN  │───▶│ CHECKED_OUT │
│  (Created)  │    │  (Admin)    │    │ (Security)  │    │ (Security)  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │
       │           ┌─────────────┐
       └──────────▶│  REJECTED   │
                   │  (Admin)    │
                   └─────────────┘
```

---

## 🎯 Learning Outcomes

- ✅ Full-stack MERN application development
- ✅ JWT authentication & RBAC implementation
- ✅ Middleware-based security patterns
- ✅ Audit logging & compliance tracking
- ✅ MongoDB schema design with relationships
- ✅ Redux Toolkit state management
- ✅ React Router v6 with protected routes
- ✅ Search, filter & pagination patterns
- ✅ Error handling best practices
- ✅ RESTful API design principles
- ✅ Responsive UI with Tailwind CSS
- ✅ Production deployment strategies

---
<<<<<<< HEAD

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Rishiprasad Raut**  
MERN Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)

---

## ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/visitor-pass-management-system/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/visitor-pass-management-system/discussions)

---

<p align="center">
  <strong>Made with ❤️ using MERN Stack</strong><br>
  <sub>MongoDB • Express.js • React • Node.js</sub>
</p>
=======
>>>>>>> 2e121a6ee23ae1ca8c98dc2fe1838bde67fe3e81
