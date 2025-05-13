const { sequelize } = require("../../config/db");
// require("./association");
const env = require("../../config/env")

const syncOption = env.NODE_ENV === "development" ? { alter: true } : {};

sequelize
  .sync(syncOption)
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Sync failed:", err));