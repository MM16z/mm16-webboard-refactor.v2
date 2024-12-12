export const DEFAULT_PROFILE_IMAGE = '/images/anonymous.png';

export const IMAGE_CONFIG = {
    ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_TYPE_ERROR_MESSAGE: 'Invalid file type. Please select a JPEG, PNG, or WebP image.',
    MAX_SIZE_ERROR_MESSAGE: 'File size exceeds 5MB limit.',
}; 