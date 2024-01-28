import jwt from "jsonwebtoken";
import "dotenv/config";
import path from "path";
import fs from "fs";

export function signJwt(
  obj: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(getENV(keyName), "base64").toString("ascii");
  try {
    return jwt.sign(obj, signingKey, {
      ...(options && options),
      algorithm: "RS256",
    });
  } catch (err) {
    console.log("something went wrong ", err);
  }
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
) {
  switch (keyName) {
    case "accessTokenPublicKey":
      return fs.readFileSync(
        path.resolve(process.env.ACCESS_TOKEN_PUBLIC_KEY!),
        "utf8"
      );
    case "refreshTokenPublicKey":
      return fs.readFileSync(
        path.resolve(process.env.REFRESH_TOKEN_PUBLIC_KEY!),
        "utf8"
      );
    case "accessTokenPrivateKey":
      return fs.readFileSync(
        path.resolve(process.env.ACCESS_TOKEN_PRIVATE_KEY!),
        "utf8"
      );
    case "refreshTokenPrivateKey":
      return fs.readFileSync(
        path.resolve(process.env.REFRESH_TOKEN_PRIVATE_KEY!),
        "utf8"
      );
    default:
      return "";
  }
}
