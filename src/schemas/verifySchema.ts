import {z} from "zod"
export const verifySchema = z.object({
  verifyCode: z.string()
    .length(6, "Verification code must be 6 characters")
    .regex(/^[0-9]+$/, "Verification code must contain only numbers")
});

export type VerifyInput = z.infer<typeof verifySchema>;
