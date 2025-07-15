import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

await connectDB();

const corsOptions = {
  origin: process.env.CORS_ORIGIN_URL_FOR_CLIENT || "*", // Allow all origins by default
 
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 3000;

function startServer() {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

startServer();

process.on("uncaughtException", (err) => {
  console.log("Server crashed with error: ", err);
  setTimeout(() => {
    console.log("Restarting server...");
    startServer();
  }, 5000);
});
