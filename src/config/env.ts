import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/taskdb",
  JWT_SECRET: process.env.JWT_SECRET || "supersecreto",
  API_KEY: process.env.API_KEY || "supersecreta",
}
