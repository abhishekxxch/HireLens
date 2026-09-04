const mongoose = require("mongoose");
const env = require("./env");

mongoose.set("strictQuery", true);

async function connectDB() {
  if (!env.mongoUri) {
    console.warn(
      "MongoDB URI not configured. Skipping database connection in development mode."
    );
    return null;
  }

  try {
    const conn = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10_000,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    return conn;
  } catch (error) {
    if (env.isProd) {
      throw error;
    }

    console.warn(
      `MongoDB unavailable in development mode; continuing without DB: ${error.message}`
    );
    return null;
  }
}

module.exports = { connectDB };