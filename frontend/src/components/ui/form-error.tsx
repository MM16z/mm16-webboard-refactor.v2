import { ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

interface FormErrorProps {
    message?: string
    type?: 'error' | 'warning' | 'info'
    className?: string
}

export function FormError({
    message,
    type = 'error',
    className
}: FormErrorProps) {
    if (!message) return null

    const icons = {
        error: <ExclamationTriangleIcon className="h-4 w-4" />,
        warning: <ExclamationTriangleIcon className="h-4 w-4" />,
        info: <InfoCircledIcon className="h-4 w-4" />
    }

    const colors = {
        error: 'text-red-500',
        warning: 'text-yellow-500',
        info: 'text-blue-500'
    }

    return (
        <div className={cn(
            "flex items-center gap-x-2 text-sm mt-1",
            colors[type],
            className
        )}>
            {icons[type]}
            <p>{message}</p>
        </div>
    )
} 