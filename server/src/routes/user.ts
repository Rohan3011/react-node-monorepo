import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  updateUserHandler,
} from "@/controllers/user";
import validateResource from "@/middlewares/validate-schema";
import requireUser from "@/middlewares/require-user";
import { UserShape } from "@/shapes/user";

const router = express.Router();

router.get("/me", requireUser, getCurrentUserHandler);
router.put("/onboarding", requireUser, updateUserHandler);
router.post("/", validateResource(UserShape), createUserHandler);

export default router;
