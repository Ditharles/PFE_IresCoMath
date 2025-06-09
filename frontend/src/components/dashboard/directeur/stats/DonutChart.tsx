
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '../../../ui/chart'

interface DonutChartProps {
    title: string
    description: string
    data: Array<{
        name: string
        value: number
        percentage?: number
        fill: string
        badgeClass?: string
    }>
    config: ChartConfig
    total: number
    icon: React.ComponentType<{ className?: string }>
    hoveredSegment: number | null
    onSegmentHover: (index: number | null) => void
    footerText?: string
    footerIcon?: React.ComponentType<{ className?: string }>
}

export const DonutChart: React.FC<DonutChartProps> = ({
    title,
    description,
    data,
    config,
    total,
    icon: Icon,
    hoveredSegment,
    onSegmentHover,
    footerText,
    footerIcon: FooterIcon
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
                    {data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    paddingAngle={2}
                                    dataKey="value"
                                    onMouseEnter={(_, index) => onSegmentHover(index)}
                                    onMouseLeave={() => onSegmentHover(null)}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                            stroke={hoveredSegment === index ? "hsl(var(--border))" : "none"}
                                            strokeWidth={hoveredSegment === index ? 2 : 0}
                                            className="transition-all duration-300"
                                            style={{
                                                filter: hoveredSegment === index ? 'brightness(1.2)' : 'none',
                                                transform: hoveredSegment === index ? 'scale(1.05)' : 'scale(1)',
                                                transformOrigin: 'center',
                                            }}
                                        />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend
                                    content={({ payload }) => (
                                        <ChartLegendContent
                                            payload={payload}
                                            className="flex items-center justify-center gap-4"
                                        >
                                            {payload?.map((item) => {
                                                const entry = data.find(d => d.name === item.value)
                                                return (
                                                    <div key={item.value} className="flex items-center gap-1.5">
                                                        <div
                                                            className="h-2 w-2 shrink-0 rounded-[2px]"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                        <span className={entry?.badgeClass}>
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </ChartLegendContent>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground">Aucune donnée disponible</p>
                        </div>
                    )}
                </ChartContainer>
            </CardContent>
            <CardFooter className="bg-muted/50 py-3 px-4">
                <div className="w-full flex items-center justify-center gap-2">
                    {FooterIcon && <FooterIcon className="h-4 w-4 text-primary" />}
                    <span className="font-medium">
                        {footerText || `Total: ${total}`}
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
} 