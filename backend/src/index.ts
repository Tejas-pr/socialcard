import express from "express";
import router from "./routes/routes";
import pgClient, { initializeDatabase } from "./db/db";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

initializeDatabase();

app.use("/v1/", router);

process.on("SIGINT", async () => {
    console.log("\nShutting down gracefully...");
    await pgClient.end();
    console.log("PostgreSQL client disconnected");
    process.exit(0);
});
