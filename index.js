
import express from "express";
import connectdb from "./config/db.js";
import registerRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import mailRoutes from "./routes/mail.routes.js";

const app = express();

app.use(express.json());

// Mount API routes
app.use("/api/auth", registerRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/mails", mailRoutes);

app.get("/", (req, res) => {
  res.send("ColdMailer API is running");
});

// Connect to MongoDB
connectdb();

// Export the Express app for Vercel
export default app;
