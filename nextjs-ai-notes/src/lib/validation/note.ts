import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "Title required" }),
  content: z.string().nullish(),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;