//-----------------------------------------------------------------------//
// ==================================================
// DATABASE CONNECTION CONFIGURATION
// ==================================================
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:2707/remn_project";
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    const conn = await mongoose.connect(mongoURI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Nice logs
mongoose.connection.on("connected", () =>
  console.log("📡 Mongoose connected to MongoDB")
);
mongoose.connection.on("error", (err) =>
  console.error("❌ Mongoose connection error:", err)
);
mongoose.connection.on("disconnected", () =>
  console.log("📡 Mongoose disconnected from MongoDB")
);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("📡 MongoDB connection closed through app termination");
  process.exit(0);
});

export default connectDB;
