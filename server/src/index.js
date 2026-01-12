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

app.use(cors())
app.use(express.json())

app.use(helmet());

app.use(cors({
  origin: "https://visitor-pass-system.vercel.app",
  credentials: true,
}));




app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes)



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
