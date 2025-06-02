import React, { useEffect, useMemo, useState } from 'react'
import { TrendingUp, Package, Activity, Calendar, DollarSign } from 'lucide-react'
import { toast } from 'sonner'
import { ChartConfig } from '../../components/ui/chart'
import { Equipment, EquipmentStatus, EquipmentType } from '../../types/equipment'
import EquipmentService from '../../services/equipment.service'
import { DateRangeFilter } from '../../components/dashboard/directeur/stats/DateRangeFilter'
import StatCard from '../../components/dashboard/directeur/stats/StatCard'
import { DonutChart } from '../../components/dashboard/directeur/stats/DonutChart'
import { BarChartCard } from '../../components/dashboard/directeur/stats/BarChartCard'
import { LineChartCard } from '../../components/dashboard/directeur/stats/LineChartCard'
import { StatsHeader } from '../../components/dashboard/directeur/stats/StatsHeader'
import { StatsSkeleton } from '../../components/dashboard/directeur/stats/StatsSkeleton'

const chartConfig: ChartConfig = {
    SUPPLIES: {
        label: "Fournitures",
        theme: {
            light: "hsl(var(--chart-1))",
            dark: "hsl(var(--chart-1))"
        }
    },
    CONSUMABLES: {
        label: "Consommables",
        theme: {
            light: "hsl(var(--chart-2))",
            dark: "hsl(var(--chart-2))"
        }
    },
    EQUIPMENT: {
        label: "Équipement",
        theme: {
            light: "hsl(var(--chart-3))",
            dark: "hsl(var(--chart-3))"
        }
    },
    TOOLS: {
        label: "Outillage",
        theme: {
            light: "hsl(var(--chart-4))",
            dark: "hsl(var(--chart-4))"
        }
    }
}

const statusConfig = {
    [EquipmentStatus.AVAILABLE]: {
        label: "Disponible",
        theme: {
            light: "hsl(120, 94%, 20%)",  // Vert foncé (text-green-800)
            dark: "hsl(120, 94%, 30%)"
        },
        badgeClass: "bg-green-100 text-green-800"
    },
    [EquipmentStatus.LOANED]: {
        label: "En prêt",
        theme: {
            light: "hsl(43, 86%, 17%)",   // Jaune foncé (text-yellow-800)
            dark: "hsl(43, 86%, 27%)"
        },
        badgeClass: "bg-yellow-100 text-yellow-800"
    },
    [EquipmentStatus.PENDING_DELIVERY]: {
        label: "En attente",
        theme: {
            light: "hsl(217, 91%, 40%)",  // Bleu vif (text-blue-800)
            dark: "hsl(217, 91%, 50%)"
        },
        badgeClass: "bg-blue-100 text-blue-800"
    },
    [EquipmentStatus.OWNER_POSSESSION]: {
        label: "En possession",
        theme: {
            light: "hsl(152, 68%, 21%)",  // Vert émeraude (text-emerald-800)
            dark: "hsl(152, 68%, 31%)"
        },
        badgeClass: "bg-emerald-100 text-emerald-800"
    }
}

const EquipmentStats = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const equipmentService = new EquipmentService()

    const fetchEquipments = async () => {
        try {
            setIsLoading(true)
            const response = await equipmentService.getAllEquipments()
            setEquipments(response.data || [])
        } catch (error: unknown) {
            console.error("Erreur lors de la recherche des équipements:", error)
            toast.error("Une erreur s'est produite lors de la recherche des équipements.")
            setEquipments([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEquipments()
    }, [])

    // Filtrer les équipements selon la période sélectionnée
    const filteredEquipments = useMemo(() => {
        if (!startDate && !endDate) return equipments

        return equipments.filter(equipment => {
            const equipmentDate = new Date(equipment.acquisitionDate || '')
            if (startDate && endDate) {
                return equipmentDate >= startDate && equipmentDate <= endDate
            } else if (startDate) {
                return equipmentDate >= startDate
            } else if (endDate) {
                return equipmentDate <= endDate
            }
            return true
        })
    }, [equipments, startDate, endDate])

    // Données pour le PieChart des types d'équipements
    const typeData = useMemo(() => {
        if (!filteredEquipments.length) return []

        const typeCounts = filteredEquipments.reduce((acc: Record<EquipmentType, number>, equipment) => {
            acc[equipment.category.type] = (acc[equipment.category.type] || 0) + 1
            return acc
        }, {} as Record<EquipmentType, number>)

        const total = filteredEquipments.length
        return Object.entries(typeCounts).map(([name, value]) => {
            const config = chartConfig[name as EquipmentType]
            const color = config?.theme?.light ?? "hsl(var(--chart-1))"
            return {
                name,
                value,
                percentage: Math.round((value / total) * 100),
                fill: color
            }
        })
    }, [filteredEquipments])

    // Données pour le BarChart des acquisitions
    const acquisitionData = useMemo(() => {
        const data = []
        const endDate = new Date()
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 6)

        for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
            const monthYear = d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
            const count = filteredEquipments.filter(equipment => {
                const acquisitionDate = new Date(equipment.acquisitionDate || '')
                return acquisitionDate.getMonth() === d.getMonth() &&
                    acquisitionDate.getFullYear() === d.getFullYear()
            }).length

            data.push({
                name: monthYear,
                value: count
            })
        }

        return data
    }, [filteredEquipments])

    // Données pour le LineChart des coûts
    const costData = useMemo(() => {
        const data = []
        const endDate = new Date()
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 6)

        for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
            const monthYear = d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
            const monthlyCost = filteredEquipments
                .filter(equipment => {
                    const acquisitionDate = new Date(equipment.acquisitionDate || '')
                    return acquisitionDate.getMonth() === d.getMonth() &&
                        acquisitionDate.getFullYear() === d.getFullYear()
                })
                .reduce((sum, equipment) => {
                    const cost = (equipment.cost as number) || 0
                    return sum + cost
                }, 0)

            data.push({
                name: monthYear,
                value: monthlyCost
            })
        }
        return data
    }, [filteredEquipments])

    // Données pour le PieChart des statuts
    const statusData = useMemo(() => {
        if (!filteredEquipments.length) return []

        const statusCounts = filteredEquipments.reduce((acc: Record<EquipmentStatus, number>, equipment) => {
            acc[equipment.status] = (acc[equipment.status] || 0) + 1
            return acc
        }, {} as Record<EquipmentStatus, number>)

        const total = filteredEquipments.length
        return Object.entries(statusCounts).map(([name, value]) => {
            const config = statusConfig[name as EquipmentStatus]
            return {
                name,
                value,
                percentage: Math.round((value / total) * 100),
                fill: config?.theme?.light || "hsl(var(--muted-foreground))",
                badgeClass: config?.badgeClass || ""
            }
        })
    }, [filteredEquipments])

    if (isLoading) {
        return <StatsSkeleton />
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <StatsHeader
                    title="Équipements"
                    description="Tableau de bord analytique en temps réel"
                />

                <DateRangeFilter
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onReset={() => {
                        setStartDate(undefined)
                        setEndDate(undefined)
                    }}
                />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {Object.entries(chartConfig).map(([key, config]) => {
                        const count = filteredEquipments.filter(e => e.category.type === key).length
                        return (
                            <StatCard
                                key={key}
                                title={config.label as string}
                                value={count.toString()}
                                icon={Package}
                                backgroundColor={config.theme?.light ?? "hsl(var(--chart-1))"}
                            />
                        )
                    })}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <DonutChart
                        title="Répartition par Type"
                        description="Distribution des types d'équipements"
                        data={typeData}
                        config={chartConfig}
                        total={filteredEquipments.length}
                        icon={Package}
                        hoveredSegment={hoveredSegment}
                        onSegmentHover={setHoveredSegment}
                        footerText={`Total: ${filteredEquipments.length} équipements`}
                        footerIcon={Activity}
                    />

                    <BarChartCard
                        title="Acquisitions Mensuelles"
                        description="Évolution des acquisitions sur la période"
                        data={acquisitionData}
                        config={chartConfig}
                        icon={TrendingUp}
                        footerText="Période: 6 derniers mois"
                        footerIcon={Calendar}
                        barColor={chartConfig.EQUIPMENT?.theme?.light ?? "hsl(var(--chart-3))"}
                    />

                    <LineChartCard
                        title="Évolution des Coûts"
                        description="Coûts totaux des acquisitions mensuelles"
                        data={costData}
                        config={chartConfig}
                        icon={DollarSign}
                        footerText="Période: 6 derniers mois"
                        footerIcon={Calendar}
                        lineColor={chartConfig.EQUIPMENT?.theme?.light ?? "hsl(var(--chart-3))"}
                    />

                    <DonutChart
                        title="Répartition par Statut"
                        description="Distribution des statuts des équipements"
                        data={statusData}
                        config={statusConfig}
                        total={filteredEquipments.length}
                        icon={Activity}
                        hoveredSegment={hoveredSegment}
                        onSegmentHover={setHoveredSegment}
                        footerText={`Total: ${filteredEquipments.length} équipements`}
                        footerIcon={Activity}
                    />
                </div>
            </div>
        </div>
    )
}

export default EquipmentStats