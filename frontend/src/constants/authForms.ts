import { FormFields } from "@/types/auth.types";

export const formFields: FormFields = {
    login: [
        {
            label: "Enter your email/username :D",
            type: "text",
            name: "email",
            autoFocus: true,
        },
        {
            label: "Enter your password :v",
            type: "password",
            name: "password",
        },
    ],
    register: [
        {
            label: "Enter your email :D",
            type: "email",
            name: "email",
            autoFocus: true,
        },
        {
            label: "Enter your password :v",
            type: "password",
            name: "password",
        },
        {
            label: "Enter your username :0",
            type: "text",
            name: "username",
            className: "w-1/2 self-center",
        },
    ],
}