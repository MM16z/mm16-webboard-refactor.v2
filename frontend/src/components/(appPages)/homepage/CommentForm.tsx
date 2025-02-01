"use client"

import { homepageApiService } from '@/api/homepageService'
import { verela } from '@/fonts/fonts'
import { useAppSelector } from '@/redux/hook'
import { useRouter } from 'next/navigation'
import { useForm, ControllerRenderProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { commentSchema } from '@/schemas/comment.schema'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { CommentFormData } from '@/types/shared/commentTypes'

export default function CommentForm({ postId }: { postId: number }) {
    const router = useRouter()
    const userId = useAppSelector(state => state.userSlice.currentUser.userId)

    const form = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: "",
        },
    })

    const onSubmit = async (data: CommentFormData) => {
        try {
            const response = await homepageApiService.createComment({
                commentContent: data.comment,
                postId: postId,
            })

            if (response.status === 200) {
                toast.success("Comment created successfully")
                form.reset()
                router.refresh()
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to create comment")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-center pl-8 pr-8 mt-4">
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }: { field: ControllerRenderProps<CommentFormData, "comment"> }) => (
                        <FormItem className="min-w-[100%]">
                            <FormLabel>Type something nice :D</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className={verela.className}
                                    disabled={!userId}
                                    placeholder="Write your comment here..."
                                    style={{
                                        backgroundColor: "white",
                                        color: "black",
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={!userId}
                    className={!userId ? "opacity-50 cursor-help" : ""}
                >
                    Submit
                </Button>
            </form>
        </Form>
    )
}
