import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../../../ui/chart'
import { LucideIcon } from 'lucide-react'

interface BarChartCardProps {
    title: string
    description: string
    data: Array<{
        name: string
        value: number
    }>
    config: ChartConfig
    icon: LucideIcon
    footerText?: string
    footerIcon?: LucideIcon
    barColor?: string
}

export const BarChartCard: React.FC<BarChartCardProps> = ({
    title,
    description,
    data,
    config,
    icon: Icon,
    footerText,
    footerIcon: FooterIcon,
    barColor
}) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {title}
                </CardTitle>
                <CardDescription className="text-sm">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 px-4">
                <ChartContainer config={config} className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 20, left: 0, bottom: 60 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="hsl(var(--border))"
                                horizontal={true}
                                vertical={false}
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="value"
                                fill={barColor || "hsl(var(--chart-1))"}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="bg-muted/50 py-3 px-4">
                <div className="w-full flex items-center justify-center gap-2">
                    {FooterIcon && <FooterIcon className="h-4 w-4 text-primary" />}
                    <span className="font-medium">
                        {footerText}
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
} 