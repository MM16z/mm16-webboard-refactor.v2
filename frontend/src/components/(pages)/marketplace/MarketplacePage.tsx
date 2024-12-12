'use client'

import { Card } from "@/components/ui/card"

export function MarketplacePage() {
    return (
        <div className="h-full overflow-auto p-4">
            <div className="mm16-info">
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">MarketplacePage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="p-4">
                        <h3 className="font-semibold">Product {item}</h3>
                        <p className="text-muted-foreground">Product description here</p>
                        <p className="font-medium mt-2">$99.99</p>
                    </Card>
                ))}
            </div>
            <div className="text-red-500 font-bold text-xl mt-4">Info: E-commerce page is still in the implementation phase.</div>
        </div>
    )
} 