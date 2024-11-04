import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema"

export type AuthFormType = {
    onFormSubmit: (data: LoginSchema | RegisterSchema) => void
    pageType: "login" | "register"
}

export type FormConfig<T> = {
    label: string
    type: string
    name: keyof T
    autoFocus?: boolean
    className?: string
}

export type FormFields = {
    login: FormConfig<LoginSchema>[]
    register: FormConfig<RegisterSchema>[]
}