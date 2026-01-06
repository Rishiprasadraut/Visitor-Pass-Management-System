const path = require('path');
const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const connectDB = require("./config/db")

const authRoutes = require("./routes/auth/routes");
const visitorRoutes = require("./routes/visitor/routes")
const app = express()


const PORT = process.env.PORT || 3000;

connectDB();


app.use(cors())
app.use(express.json())



app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes)



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
