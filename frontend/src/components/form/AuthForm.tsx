import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema"
import { loginSchema, registerSchema } from "@/schemas/auth.schema"
import { AuthFormType, FormConfig } from "@/types/auth.types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { formFields } from "@/constants/authForms"

export default function AuthForm({ onFormSubmit, pageType }: AuthFormType) {
    const schema = pageType === "login" ? loginSchema : registerSchema
    type FormData = z.infer<typeof schema>

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
            ...(pageType === "register" && { username: "" }),
        },
    })

    const fields = formFields[pageType]

    const renderField = (field: FormConfig<FormData>) => (
        <div
            key={field.name}
            className='login-inputcontainer flex flex-col justify-center justify-items-center text-center gap-y-2'
            data-name={`login-input-${field.name}`}
        >
            <div className='text-[40px] text-center'>{field.label}</div>
            <input
                className={`inputborder login-input text-5xl pl-8 pr-8 ${field.className || ''}`}
                type={field.type}
                autoFocus={field.autoFocus}
                {...form.register(field.name)}
            />
            {form.formState.errors[field.name] && (
                <p className="text-red-500">
                    {form.formState.errors[field.name]?.message}
                </p>
            )}
        </div>
    )

    return (
        <form
            className='flex flex-col w-full h-full justify-center justify-items-center'
            onSubmit={form.handleSubmit(onFormSubmit)}
        >
            {fields.map(field => renderField(field as FormConfig<FormData>))}

            {pageType === "login" && (
                <div className="text-center pt-4">
                    <div className='toregisref opacity-60'>
                        Try demo account - username: admin, password: 1234
                    </div>
                    <div className='font-bold cursor-pointer'>Click here</div>
                </div>
            )}

            <input
                className="login-submit-btn cursor-pointer text-[64px] w-4/5 h-[124px] mt-6 self-center border border-gray-400 hover:text-white hover:bg-black"
                type="submit"
                value={pageType === "register" ? "Register" : "Login"}
            />
        </form>
    )
}
