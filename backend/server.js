const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./routes/resumeRoutes");
const requireClerkAuth = require("./middleware/clerkAuth"); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
console.log("🔍 typeof requireClerkAuth:", typeof requireClerkAuth)
// Route Middleware (secured with Clerk)
app.use("/api/resumes", requireClerkAuth, resumeRoutes);

// MongoDB Connection + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
