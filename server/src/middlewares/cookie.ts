import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "@/utils/jwt";

interface tokenType {
  accessToken: string;
  refreshToken: string;
}

async function cookieJwtAuth(req: Request, res: Response, next: NextFunction) {
  if (req.cookies?.token === undefined) {
    return next();
  }
  const token: tokenType = req.cookies.token;
  try {
    const decoded = verifyJwt(token.accessToken, "accessTokenPublicKey");
    if (decoded) {
      res.locals.user = decoded;
    }
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
}

export default cookieJwtAuth;
