import { z } from "zod";

export const sessionShape = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email or password"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Invalid email or password"),
  }),
});

export type createSessionInput = z.TypeOf<typeof sessionShape>["body"];
