import { z } from "zod";

export const contactFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(8),
});

export type FormFields = z.infer<typeof contactFormSchema>;
