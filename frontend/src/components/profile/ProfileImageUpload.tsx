import { ChangeEvent, useEffect, useState } from 'react';

import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import NoProfileImage from '@/assets/anonymous.png';
import { updateUser } from '@/redux/slices/userSlice/userSlice';

import { dashBoardApiService } from '@/api/userDashboardService';

interface ProfileImageUploadProps {
    currentImageUrl?: string;
    onImageUpdate?: (newImageUrl: string) => void;
    showUploadSection?: boolean;
    customSize?: `w-${string} h-${string}`;
}

export const ProfileImageUpload = ({ currentImageUrl, onImageUpdate, showUploadSection = true, customSize }: ProfileImageUploadProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const getUserData = useAppSelector((state) => state.userSlice.currentUser);
    const userId = getUserData.userId;

    const [profileImageUrl, setProfileImageUrl] = useState<string>('');

    const dispatch = useAppDispatch();

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('userId', userId?.toString() ?? '');

        try {
            const response = await dashBoardApiService.uploadProfileImage(formData);

            if (response.data.success) {
                setUploadStatus('File uploaded successfully');
                if (onImageUpdate) {
                    onImageUpdate(response.data.imageUrl);
                }
                dispatch(updateUser({ ...getUserData, profileImage: response.data.imageUrl }));
                setPreviewUrl(null);
                setSelectedFile(null);
            } else {
                setUploadStatus('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('Error uploading file');
        }
    };

    const [isImageError, setIsImageError] = useState<boolean>(false);

    const handleImageError = () => {
        setIsImageError(true);
        dispatch(updateUser({
            ...getUserData,
            profileImage: null
        }));
        setProfileImageUrl('');
    };

    useEffect(() => {
        if (currentImageUrl && !isImageError) {
            setProfileImageUrl(currentImageUrl);
        }
    }, [currentImageUrl, isImageError]);

    return (
        <div className={`${showUploadSection ? 'flex flex-col gap-4 p-4 items-center' : (!showUploadSection && customSize) ? "w-fit" : 'w-fit pl-4 pr-4 pt-3 pb-2'}`}>
            {/* Current Profile Image */}
            <div className={`${showUploadSection ? 'mb-4 flex flex-col items-center' : ''}`}>
                {showUploadSection && <h3 className="text-lg font-semibold mb-4">Current Profile Image</h3>}
                <div className={`${showUploadSection ? 'relative w-32 h-32' : (!showUploadSection && customSize) ? `relative ${customSize}` : 'relative w-12 h-12'}`}>
                    <Image
                        src={profileImageUrl ? `${process.env.NEXT_PUBLIC_URL}${profileImageUrl}` : NoProfileImage.src}
                        alt="profile image"
                        fill
                        className="rounded-full object-cover ring-1"
                        title="Profile image icons created by Freepik - Flaticon"
                        onError={handleImageError}
                    />
                </div>
            </div>


            {/* Upload New Image Section */}
            {showUploadSection && (
                <div className="border rounded-lg p-4 bg-gray-50 w-[60%]">
                    <h3 className="text-lg font-semibold mb-2">
                        {profileImageUrl ? 'Update Profile Image' : 'Upload Profile Image'}
                    </h3>

                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileSelect}
                        className="border p-2 w-full mb-4"
                    />

                    {previewUrl && (
                        <div className="mt-4 mb-4 flex flex-col items-center">
                            <p className="font-medium mb-2">Preview:</p>
                            <div className="relative w-32 h-32">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.nativeEvent.stopImmediatePropagation();
                            handleUpload()
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                        disabled={!selectedFile}
                    >
                        {profileImageUrl ? 'Update Image' : 'Upload Image'}
                    </button>

                    {uploadStatus && (
                        <p className={`mt-2 ${uploadStatus.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                            {uploadStatus}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}; 