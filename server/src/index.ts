import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import router from "@/routes";
import log from "@/utils/logger";
import { connectToDB } from "@/utils/db";
import allowCors from "./middlewares/allow-cors";
import webpush from "web-push";

dotenv.config();

const app = express();
const port = process.env.PORT!;

// push notifications
webpush.setVapidDetails(
  "mailto:rohanopdev@email.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// serve client
app.use(express.static(path.join(__dirname, "../../client/dist")));

// routes definition
app.use("/api", router);

const subscriptions: any = [];

app.post("/api/subscribe", (req, res) => {
  const subscription = req.body.subscription;
  // Save the subscription information in your database if needed
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.get("/api/send-notification", (req, res) => {
  const payload = JSON.stringify({ title: "Test Notification" });

  for (const subscription of subscriptions) {
    webpush
      .sendNotification(subscription, payload)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => {
        console.error("Error sending notification:", error);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      });
  }
});

app.listen(port, () => {
  log.info(`Server is running at http://localhost:${port}`);
  connectToDB();
});
