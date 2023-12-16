import express from "express";

import Status from "@/utils/http-status-code";

const router = express.Router();

router.get("/health", (_, res) => {
  res.sendStatus(Status.OK);
});

export default router;
