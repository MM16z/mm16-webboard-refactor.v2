import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import NoProfileImage from '@/assets/anonymous.png';
import { updateUser } from '@/redux/slices/userSlice/userSlice';
import { dashBoardApiService } from '@/api/userDashboardService';
import { validateFileType } from '@/utils/uploads';
import { IMAGE_CONFIG } from '@/config/constants';

interface ProfileImageUploadProps {
    currentImageUrl?: string;
    onImageUpdate?: (newImageUrl: string) => void;
    showUploadSection?: boolean;
    customSize?: `w-${string} h-${string}`;
}

export const ProfileImageUpload = ({
    currentImageUrl,
    onImageUpdate,
    showUploadSection = true,
    customSize
}: ProfileImageUploadProps) => {
    const [uploadState, setUploadState] = useState({
        selectedFile: null as File | null,
        previewUrl: null as string | null,
        isUploading: false,
        error: null as string | null,
        isImageError: false
    });


    const { currentUser } = useAppSelector((state) => state.userSlice);
    const dispatch = useAppDispatch();

    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            if (!validateFileType(file)) {
                throw new Error(IMAGE_CONFIG.ACCEPTED_TYPE_ERROR_MESSAGE);
            }

            if (file.size > IMAGE_CONFIG.MAX_SIZE) {
                throw new Error(IMAGE_CONFIG.MAX_SIZE_ERROR_MESSAGE);
            }

            setUploadState(prev => ({
                ...prev,
                selectedFile: file,
                previewUrl: URL.createObjectURL(file),
                error: null
            }));
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error selecting file');
            setUploadState(prev => ({
                ...prev,
                selectedFile: null,
                previewUrl: null,
                error: error instanceof Error ? error.message : 'Unknown error'
            }));
        }
    };

    const handleUpload = async () => {
        if (!uploadState.selectedFile || !currentUser?.userId) {
            toast.error('Please select a file first');
            return;
        }

        setUploadState(prev => ({ ...prev, isUploading: true, error: null }));

        try {
            const formData = new FormData();
            formData.append('image', uploadState.selectedFile);
            formData.append('userId', currentUser.userId.toString());

            const { data } = await dashBoardApiService.uploadProfileImage(formData);

            if (!data.success) {
                throw new Error(data.message || 'Upload failed');
            }

            onImageUpdate?.(data.imageUrl);
            dispatch(updateUser({
                ...currentUser,
                profileImage: data.imageUrl
            }));

            toast.success('Profile image updated successfully');

            setUploadState({
                selectedFile: null,
                previewUrl: null,
                isUploading: false,
                error: null,
                isImageError: false
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error uploading image';
            toast.error(errorMessage);
            setUploadState(prev => ({
                ...prev,
                isUploading: false,
                error: errorMessage,
                isImageError: false
            }));
        }
    };

    const handleImageError = () => {
        setUploadState(prev => ({
            ...prev,
            isImageError: true
        }));
    };

    return (
        <div className={`${showUploadSection ? 'flex flex-col gap-4 p-4 items-center' : (!showUploadSection && customSize) ? "w-fit" : 'w-fit pl-4 pr-4 pt-3 pb-2'}`}>
            {/* Current Profile Image */}
            <div className={`${showUploadSection ? 'mb-4 flex flex-col items-center' : ''}`}>
                {showUploadSection && <h3 className="text-lg font-semibold mb-4">Current Profile Image</h3>}
                <div className={`${showUploadSection ? 'relative w-32 h-32' : (!showUploadSection && customSize) ? `relative ${customSize}` : 'relative w-12 h-12'}`}>
                    <Image
                        src={uploadState.isImageError || !currentImageUrl
                            ? NoProfileImage.src
                            : `${process.env.NEXT_PUBLIC_URL}${currentImageUrl}`
                        }
                        alt="profile image"
                        fill
                        className="rounded-full object-cover ring-1"
                        onError={handleImageError}
                        priority
                    />
                </div>
            </div>

            {/* Upload Section */}
            {showUploadSection && (
                <Card className="w-[100%] p-4">
                    <div className="space-y-4">
                        <Input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileSelect}
                            disabled={uploadState.isUploading}
                            className={cn(
                                "file:mr-4 file:py-2 file:px-4",
                                "file:rounded-lg file:border-0",
                                "file:text-sm file:font-semibold",
                                "file:bg-violet-50 file:text-violet-700",
                                "hover:file:bg-violet-100",
                                "border border-input rounded-lg",
                                "text-sm",
                                "disabled:cursor-not-allowed disabled:opacity-50",
                                "h-12"
                            )}
                        />

                        {uploadState.previewUrl && (
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-sm font-medium">Preview:</span>
                                <div className="relative w-32 h-32">
                                    <Image
                                        src={uploadState.previewUrl}
                                        alt="Preview"
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={handleUpload}
                            disabled={!uploadState.selectedFile || uploadState.isUploading}
                            className="w-full"
                        >
                            {uploadState.isUploading ? 'Uploading...' : currentImageUrl ? 'Update Image' : 'Upload Image'}
                        </Button>

                        {uploadState.error && (
                            <p className="text-red-500 text-sm mt-2">{uploadState.error}</p>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
};