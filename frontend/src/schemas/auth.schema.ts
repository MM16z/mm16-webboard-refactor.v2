import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters"),
})

export const registerSchema = loginSchema.extend({
    username: z.string().min(3, "Username must be at least 3 characters"),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema> 