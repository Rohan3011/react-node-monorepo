import jwt from "jsonwebtoken";
import "dotenv/config";

export function signJwt(
  obj: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(getENV(keyName), "base64").toString("ascii");

  return jwt.sign(obj, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(
  token: any,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null {
  const publicKey = Buffer.from(getENV(keyName), "base64").toString("ascii");

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}

// helper
function getENV(
  keyName:
    | "accessTokenPublicKey"
    | "refreshTokenPublicKey"
    | "accessTokenPrivateKey"
    | "refreshTokenPrivateKey"
): string {
  switch (keyName) {
    case "accessTokenPublicKey":
      return process.env.ACCESS_TOKEN_PUBLIC_KEY || "";
    case "refreshTokenPublicKey":
      return process.env.REFRESH_TOKEN_PUBLIC_KEY || "";
    case "accessTokenPrivateKey":
      return process.env.ACCESS_TOKEN_PRIVATE_KEY || "";
    case "refreshTokenPrivateKey":
      return process.env.REFRESH_TOKEN_PRIVATE_KEY || "";
    default:
      return "";
  }
}
