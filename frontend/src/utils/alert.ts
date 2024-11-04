import Swal from 'sweetalert2';

type AlertType = 'success' | 'error' | 'warning';

interface AlertOptions {
    title: string;
    text: string;
    showCancelButton?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

export const showAlert = (type: AlertType, options: AlertOptions) => {
    return Swal.fire({
        icon: type,
        ...options
    });
};

export const showConfirmation = (options: AlertOptions) => {
    return Swal.fire({
        icon: 'warning',
        showCancelButton: true,
        ...options
    });
}; 