require("dotenv").config();
console.log("MONGO_URL =", process.env.MONGO_URL);
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = require("./server/app")

mongoose.connect(process.env.MONGO_URL)

.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});



