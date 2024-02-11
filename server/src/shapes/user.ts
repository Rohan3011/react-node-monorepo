import { z } from "zod";

export const UserShape = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "First Name is required",
      }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password is too short - should be min 6 characters"),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      onboarding: z.boolean().optional().default(false),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = z.TypeOf<typeof UserShape>["body"];
export type UpdateUserInput = Pick<CreateUserInput, "onboarding">;
