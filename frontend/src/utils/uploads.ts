import { IMAGE_CONFIG } from "@/config/constants";

export const validateFileType = (file: File): boolean => {
    const validTypes = IMAGE_CONFIG.ACCEPTED_TYPES;
    return validTypes.includes(file.type);
}; 