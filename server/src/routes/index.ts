import express from "express";

import Status from "@/utils/http-status-code";
import authRouter from "./auth";
import userRouter from "./user";

const router = express.Router();

router.get("/health", (_, res) => {
  res.sendStatus(Status.OK);
});

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
