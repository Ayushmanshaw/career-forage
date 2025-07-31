// server.js (ESM-compatible)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";
import requireClerkAuth from "./middleware/clerkAuth.js";
import resumeParserRoute from "./routes/getResumeParse.js";
import authRoutes from './routes/auth.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging
console.log("🔍 typeof requireClerkAuth:", typeof requireClerkAuth);

// Routes
app.use("/api/resumes", requireClerkAuth, resumeRoutes); // Clerk protected
app.use("/api/ai", resumeParserRoute); // GPT parser route


app.use('/api', authRoutes);

app.get("/", (req, res) => {
  res.send("👋 Hello from the Resume Builder Backend!");
});

// DB Connection + Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
