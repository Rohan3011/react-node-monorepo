import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import Status from "@/utils/http-status-code";

/**
 * @middleware Validates incoming Request against the defined schemas
 */
const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(Status.BAD_REQUEST).send(e.errors);
    }
  };

export default validateResource;
