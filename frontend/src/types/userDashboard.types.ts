import { z } from 'zod';
import { postSchema } from '@/schemas/userdashboard.schema';

type PostFormData = z.infer<typeof postSchema>;

type EditInputValue = {
    post_id: number | null;
    post_content: string;
}

export type { PostFormData, EditInputValue };