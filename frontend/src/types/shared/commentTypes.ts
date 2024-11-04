import { commentSchema } from "@/schemas/comment.schema";
import { z } from "zod";

export type CommentFormData = z.infer<typeof commentSchema>; 