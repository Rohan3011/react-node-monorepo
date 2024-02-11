import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@/utils/http-status-code";

async function requireUser(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL!);

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    return res
      .status(HttpStatusCode.FORBIDDEN)
      .send({ error: "User doesn't exits, please login!" });
  }

  return next();
}

export default requireUser;
