import { Request, Response } from "express";
import { get } from "lodash";
import StatusCode from "@/utils/http-status-code";
import { verifyJwt } from "@/utils/jwt";
import { createSessionInput } from "@/shapes/auth";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "@/services/auth";
import { findUserByEmail, findUserById } from "@/services/user";

const EXPIRES_IN_30_DAYS = 25892000000;

export async function createSessionHandler(
  req: Request<{}, {}, createSessionInput>,
  res: Response
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send({ error: "Invalid email or password" });
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send({ error: "Invalid email or password" });
  }

  // sign an access token
  const accessToken = signAccessToken(user);
  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });
  // cookie
  res
    .cookie(
      "token",
      { accessToken, refreshToken },
      { expires: new Date(Date.now() + EXPIRES_IN_30_DAYS), httpOnly: true }
    )
    .send({
      success: "User logged in successfully",
      tokens: { accessToken, refreshToken },
    });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");
  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send("Failed to refresh access token");
  }

  const session = await findSessionById(decoded.session);
  if (!session || !session.valid) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send("Failed to refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send("Failed to refresh access token");
  }
  const accessToken = signAccessToken(user);
  return res.send({ accessToken });
}
