const path = require('path');
const express = require('express')
const cors = require('cors')
const helmet = require("helmet");
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const connectDB = require("./config/db")

const authRoutes = require("./routes/auth/routes");
const visitorRoutes = require("./routes/visitor/routes")
const app = express()


const PORT = process.env.PORT || 3000;

connectDB();

app.use(require("./middlewares/errorHandler"));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://visitor-pass-system.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(helmet());

// Serve static files (uploaded photos)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));



app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes)



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
