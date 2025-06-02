import React from 'react'
import { Card, CardContent } from '../../../ui/card'

interface StatCardProps {
    title: string;
    value: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
    iconColor?: string;
    backgroundColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    iconColor = "hsl(var(--primary))",
    backgroundColor
}) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                        </p>
                        <p className="text-2xl font-bold">
                            {value}
                        </p>
                    </div>
                    {Icon ? (
                        <Icon className="h-5 w-5 text-[var(--primary)]" />
                    ) : backgroundColor ? (
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor }}
                        />
                    ) : null}
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard