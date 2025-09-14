// ==================================================
// ERROR HANDLING MIDDLEWARE
// ==================================================
// Middleware xử lý tất cả errors trong application
// Định dạng lại error message và trả về client

const errorHandler = (err, req, res, next) => {
  // Log error details for debugging
  console.error("❌ Error occurred:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId error
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = { message, statusCode: 401 };
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    error = { message, statusCode: 401 };
  }

  // Default error response
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;
