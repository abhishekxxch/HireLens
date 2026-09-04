const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const required = ["MONGO_URI", "JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);
const isProduction = process.env.NODE_ENV === "production";

if (missing.length && isProduction) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
} else if (missing.length) {
  console.warn(
    `Missing env vars in development: ${missing.join(
      ", "
    )}. Continuing with safe defaults.`
  );
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,

  mongoUri: process.env.MONGO_URI || "",

  jwtSecret:
    process.env.JWT_SECRET || "",

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "",

  cookieName: process.env.COOKIE_NAME || "",

  clientOrigins: (
    process.env.CLIENT_ORIGIN ||
    "http://localhost:5173,http://localhost:5174"
  )
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),

  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",

  isProd: isProduction,
};