// ==================================================
// MAIN SERVER FILE - ENTRY POINT (ES Modules)
// ==================================================
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";

// Load env
dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Nếu set COOKIE_SECURE=true và chạy sau proxy/ingress, cần trust proxy
if (String(process.env.COOKIE_SECURE).toLowerCase() === "true") {
  app.set("trust proxy", 1);
}

// ==================================================
// DATABASE CONNECTION
// ==================================================
await connectDB();

// ==================================================
// MIDDLEWARES
// ==================================================
app.use(helmet());

// Parse JSON / form
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Cookie (để đọc/ghi JWT HttpOnly)
app.use(cookieParser());

// CORS cho FE (nhiều origin cách nhau bằng dấu phẩy)
const allowOrigins = (process.env.FRONTEND_URL &&
  process.env.FRONTEND_URL.split(",").map((s) => s.trim())) || [
  "http://localhost:3000",
];
app.use(
  cors({
    origin: allowOrigins,
    credentials: true,
  })
);

// Health
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  });
});

// ==================================================
// ROUTES
// ==================================================
// Chỉ limit các endpoint "nhạy cảm" như login/register, KHÔNG áp cho /me
const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const maxReq = Number(process.env.RATE_LIMIT_MAX || 60);
const authLimiter = rateLimit({ windowMs, max: maxReq });

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth", authRoutes);

// Root
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to REMN Stack API!",
    version: "1.0.0",
    endpoints: { health: "/api/health", auth: "/api/auth" },
  });
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: { message: err.message || "Server error" },
  });
});

// ==================================================
// START SERVER
// ==================================================
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
});
