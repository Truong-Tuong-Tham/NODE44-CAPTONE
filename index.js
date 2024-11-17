import express from "express";
import cors from "cors";

import rootRoutes from "./src/routes/root.router.js";

const app = express();

// Middleware xử lý JSON và CORS
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Sử dụng authRouter cho các yêu cầu liên quan đến đăng ký
app.use(rootRoutes);

// Route gốc
app.get("/", (req, res) => {
  res.send("Hello captone");
});

// Lắng nghe server
app.listen(8080, () => {
  console.log("Server is starting with port 8080");
});
