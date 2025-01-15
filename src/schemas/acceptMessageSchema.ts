import {z} from "zod"
export const acceptMessageSchema = z.object({
  acceptMessage: z.boolean() 
});

export type AcceptMessageInput = z.infer<typeof acceptMessageSchema>;
