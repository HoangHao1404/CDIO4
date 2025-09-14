// ==================================================
// DATABASE CONNECTION CONFIGURATION
// ==================================================
// File này chứa cấu hình kết nối tới MongoDB
// Sử dụng Mongoose ODM để làm việc với MongoDB

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Lấy connection string từ environment variables
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/remn_project";

    // Cấu hình connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Thêm các options khác nếu cần
    };

    // Kết nối tới MongoDB
    const conn = await mongoose.connect(mongoURI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    // Exit process nếu không kết nối được database
    process.exit(1);
  }
};

// Event listeners cho connection
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("📡 Mongoose disconnected from MongoDB");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("📡 MongoDB connection closed through app termination");
  process.exit(0);
});

export default connectDB;
