import { z } from 'zod';

export const postSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters")
        .refine((value) => value.length > 0, {
            message: "Title cannot be empty or just whitespace"
        }),
    content: z
        .string()
        .trim()
        .min(1, "Content is required")
        .min(3, "Content must be at least 3 characters")
        .max(1000, "Content must be less than 1000 characters")
        .refine((value) => value.length > 0, {
            message: "Content cannot be empty or just whitespace"
        }),
});

export const editPostSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1, "Content is required")
        .min(3, "Content must be at least 3 characters")
        .max(1000, "Content must be less than 1000 characters")
        .refine((value) => value.length > 0, {
            message: "Content cannot be empty or just whitespace"
        }),
});

export type EditPostFormData = z.infer<typeof editPostSchema>; 