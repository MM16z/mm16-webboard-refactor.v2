export interface ProfileImageUploadProps {
    currentImageUrl?: string;
    onImageUpdate?: (newImageUrl: string) => void;
    variant?: 'default' | 'compact';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export interface UploadResponse {
    success: boolean;
    imageUrl: string;
    message?: string;
} 