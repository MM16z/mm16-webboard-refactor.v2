import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, "Username/Email is required"),
    password: z.string().min(1, "Password is required"),
})

export const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema> 