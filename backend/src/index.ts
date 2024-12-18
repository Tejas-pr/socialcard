import express from "express";
import router from "./routes/routes";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/v1/", router);
