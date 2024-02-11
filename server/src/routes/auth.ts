import express from "express";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "@/controllers/auth";
import validateResource from "@/middlewares/validate-schema";
import { sessionShape } from "@/shapes/auth";

const router = express.Router();

router.post("/", validateResource(sessionShape), createSessionHandler);
router.post("/refresh", refreshAccessTokenHandler);

export default router;
