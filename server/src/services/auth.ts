import { omit } from "lodash";
import { signJwt } from "@/utils/jwt";
import SessionModel from "@/models/session";
import { User, privateFields } from "@/models/user";

export function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user_id: userId });
}

export function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });
  const refreshToken = signJwt(
    { session: session._id },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );
  return refreshToken;
}

export function signAccessToken(user: User) {
  const payload = omit(user.toJSON(), privateFields);
  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });
  return accessToken;
}
