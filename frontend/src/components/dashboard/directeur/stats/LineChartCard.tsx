import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../../../ui/chart'
import { LucideIcon } from 'lucide-react'

interface LineChartCardProps {
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
    lineColor?: string
    gradientId?: string
}

export const LineChartCard: React.FC<LineChartCardProps> = ({
    title,
    description,
    data,
    config,
    icon: Icon,
    footerText,
    footerIcon: FooterIcon,
    lineColor = "hsl(var(--chart-1))",
    gradientId = "lineGradient"
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
                        <LineChart
                            data={data}
                            margin={{ top: 10, right: 20, left: 0, bottom: 60 }}
                        >
                            <defs>
                                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={lineColor} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={lineColor} stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
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
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={lineColor}
                                strokeWidth={2}
                                dot={{
                                    fill: lineColor,
                                    strokeWidth: 2,
                                    stroke: 'hsl(var(--background))',
                                    r: 4
                                }}
                                activeDot={{
                                    r: 6,
                                    fill: lineColor,
                                    stroke: 'hsl(var(--background))',
                                    strokeWidth: 2
                                }}
                            />
                        </LineChart>
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