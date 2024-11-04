import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editPostSchema, type EditPostFormData } from '@/schemas/userdashboard.schema'
import { FormError } from "@/components/ui/form-error"

type PagePropTypes = {
    onClose: () => void
    titleInputValue: string | undefined
    onEditSubmit: (content: string) => void
}

export default function EditInput({ onClose, titleInputValue, onEditSubmit }: PagePropTypes) {
    const { register, handleSubmit, formState: { errors } } = useForm<EditPostFormData>({
        resolver: zodResolver(editPostSchema),
        defaultValues: {
            content: titleInputValue
        },
        mode: 'onChange'
    });

    return (
        <section className="usereditinput-container">
            <div
                id="exit-edit"
                onClick={onClose}
            >
                X
            </div>
            <form onSubmit={handleSubmit((data) => onEditSubmit(data.content))}>
                <div className="user-edit-panel-inputcontainer">
                    <label htmlFor="post-text-input" id="post-text-input">
                        Let&apos;s edit! :D
                    </label>
                    <textarea
                        {...register("content")}
                        className="post-edit-inputborder"
                        id="post-edit-text-input"
                    />
                    <FormError message={errors.content?.message} />
                    <input
                        id="post-edit-submitbtn"
                        type="submit"
                        value="EditSubmit"
                    />
                </div>
            </form>
        </section>
    )
}
