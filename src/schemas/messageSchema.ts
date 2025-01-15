import {z} from  "zod"
export const messageSchema = z.object({
    content: z.string()
    .min(10, "Message content is required") 
    .max(1000, "Message cannot exceed 1000 characters")
});

export type MessageInput = z.infer<typeof messageSchema>;
