import Image from 'next/image'
import { verela } from "@/fonts/fonts"

import nodata from "@/assets/no-data.svg"

interface NoDataProps {
    message?: string
}

export default function NoData({ message = "No data available" }: NoDataProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="relative w-64 h-64 mb-6">
                <Image
                    src={nodata}
                    alt="No data illustration"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <h3
                className={`${verela.className} text-xl text-gray-600 text-center`}
                style={{ fontWeight: 500 }}
            >
                {message}
            </h3>
        </div>
    )
} 