import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import router from "@/routes";
import log from "@/utils/logger";
import { connectToDB } from "@/utils/db";

dotenv.config();

const app = express();
const port = process.env.PORT!;

//middlewares
app.use(morgan("dev"));

// serve client
app.use(express.static(path.join(__dirname, "../../client/dist")));

// routes definition
app.use("/api", router);

app.listen(port, () => {
  log.info(`Server is running at http://localhost:${port}`);
  connectToDB();
});
