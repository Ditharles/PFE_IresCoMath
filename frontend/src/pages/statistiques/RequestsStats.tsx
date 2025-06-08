import { useEffect, useMemo, useState } from 'react'
import { TrendingUp, Package, Activity, Calendar, DollarSign, Table, BarChart3, PieChart as PieChartIcon } from 'lucide-react'
import { toast } from 'sonner'
import { ChartConfig } from '../../components/ui/chart'
import { Request, RequestStatus, RequestType } from '../../types/request'
import ManageRequestsService from '../../services/manageRequests.service'
import { DateRangeFilter } from '../../components/dashboard/directeur/stats/DateRangeFilter'
import StatCard from '../../components/dashboard/directeur/stats/StatCard'
import { DonutChart } from '../../components/dashboard/directeur/stats/DonutChart'
import { BarChartCard } from '../../components/dashboard/directeur/stats/BarChartCard'
import { LineChartCard } from '../../components/dashboard/directeur/stats/LineChartCard'
import { StatsHeader } from '../../components/dashboard/directeur/stats/StatsHeader'
import { StatsSkeleton } from '../../components/dashboard/directeur/stats/StatsSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { REQUEST_TYPE_LABELS } from '../../constants/requests'

const chartConfig: ChartConfig = {
    [RequestType.MISSION]: {
        label: "Mission",
        theme: {
            light: "hsl(var(--chart-1))",
            dark: "hsl(var(--chart-1))"
        }
    },
    [RequestType.INTERNSHIP]: {
        label: "Stage",
        theme: {
            light: "hsl(var(--chart-2))",
            dark: "hsl(var(--chart-2))"
        }
    },
    [RequestType.CONFERENCE_NATIONAL]: {
        label: "Conférence national",
        theme: {
            light: "hsl(var(--chart-3))",
            dark: "hsl(var(--chart-3))"
        }
    },
    [RequestType.EQUIPMENT_PURCHASE]: {
        label: "Achat Matériel",
        theme: {
            light: "hsl(var(--chart-4))",
            dark: "hsl(var(--chart-4))"
        }
    },
    [RequestType.EQUIPMENT_LOAN]: {
        label: "Prêt Matériel",
        theme: {
            light: "hsl(var(--chart-5))",
            dark: "hsl(var(--chart-5))"
        }
    },
    [RequestType.REPAIR_MAINTENANCE]: {
        label: "Réparation & Maintenance",
        theme: {
            light: "hsl(var(--chart-1))",
            dark: "hsl(var(--chart-1))"
        }
    },
    [RequestType.ARTICLE_REGISTRATION]: {
        label: "Inscription Article",
        theme: {
            light: "hsl(var(--chart-6))",
            dark: "hsl(var(--chart-7))"
        }
    }
}


const statusConfig = {
    [RequestStatus.PENDING]: {
        label: "En attente",
        theme: {
            light: "hsl(43, 86%, 17%)",
            dark: "hsl(43, 86%, 27%)"
        },
        badgeClass: "bg-yellow-100 text-yellow-800"
    },
    [RequestStatus.APPROVED || RequestStatus.APPROVED_BY_DIRECTOR || RequestStatus.APPROVED_BY_SUPERVISOR]: {
        label: "Approuvée",
        theme: {
            light: "hsl(120, 94%, 20%)",
            dark: "hsl(120, 94%, 30%)"
        },
        badgeClass: "bg-green-100 text-green-800"
    },
    APPROVED_BY_DIRECTOR: {
        label: "Approuvée",
        theme: {
            light: "hsl(120, 94%, 20%)",
            dark: "hsl(120, 94%, 30%)"
        },
        badgeClass: "bg-green-100 text-green-800"
    },
    APPROVED_BY_SUPERVISOR: {
        label: "Approuvée",
        theme: {
            light: "hsl(120, 94%, 20%)",
            dark: "hsl(120, 94%, 30%)"
        },
        badgeClass: "bg-green-100 text-green-800"
    },
    REJECTED: {
        label: "Rejetée",
        theme: {
            light: "hsl(0, 84%, 60%)",
            dark: "hsl(0, 84%, 70%)"
        },
        badgeClass: "bg-red-100 text-red-800"
    },
    REJECTED_BY_DIRECTOR: {
        label: "Rejetée",
        theme: {
            light: "hsl(0, 84%, 60%)",
            dark: "hsl(0, 84%, 70%)"
        },
        badgeClass: "bg-red-100 text-red-800"
    },
    REJECTED_BY_SUPERVISOR: {
        label: "Rejetée",
        theme: {
            light: "hsl(0, 84%, 60%)",
            dark: "hsl(0, 84%, 70%)"
        },
        badgeClass: "bg-red-100 text-red-800"
    },
    [RequestStatus.COMPLETED]: {
        label: "Terminée",
        theme: {
            light: "hsl(152, 68%, 21%)",
            dark: "hsl(152, 68%, 31%)"
        },
        badgeClass: "bg-emerald-100 text-emerald-800"
    }
}

const RequestsStats = () => {
    const [requests, setRequests] = useState<Request[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const requestService = new ManageRequestsService()

    const fetchRequests = async () => {
        try {
            setIsLoading(true)
            const response = await requestService.getAllRequests()
            setRequests(response.data || [])
        } catch (error: unknown) {
            console.error("Erreur lors de la recherche des demandes:", error)
            toast.error("Une erreur s'est produite lors de la recherche des demandes.")
            setRequests([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    // Filtrer les demandes selon la période sélectionnée
    const filteredRequests = useMemo(() => {
        if (!startDate && !endDate) return requests

        return requests.filter(request => {
            const requestDate = new Date(request.createdAt || '')
            if (startDate && endDate) {
                return requestDate >= startDate && requestDate <= endDate
            } else if (startDate) {
                return requestDate >= startDate
            } else if (endDate) {
                return requestDate <= endDate
            }
            return true
        })
    }, [requests, startDate, endDate])

    // Données pour le PieChart des statuts
    const statusData = useMemo(() => {
        if (!filteredRequests.length) return []

        const statusCounts = filteredRequests.reduce((acc: Record<string, number>, request) => {
            acc[request.status] = (acc[request.status] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const total = filteredRequests.length
        return Object.entries(statusCounts).map(([name, value]) => {
            const config = statusConfig[name as keyof typeof statusConfig]
            return {
                name,
                value,
                percentage: Math.round((value / total) * 100),
                fill: config?.theme?.light || "hsl(var(--muted-foreground))",
                badgeClass: config?.badgeClass || ""
            }
        })
    }, [filteredRequests])

    // Données pour le BarChart des demandes mensuelles
    const monthlyData = useMemo(() => {
        const data = []
        const endDate = new Date()
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 6)

        for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
            const monthYear = d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
            const count = filteredRequests.filter(request => {
                const requestDate = new Date(request.createdAt || '')
                return requestDate.getMonth() === d.getMonth() &&
                    requestDate.getFullYear() === d.getFullYear()
            }).length

            data.push({
                name: monthYear,
                value: count
            })
        }

        return data
    }, [filteredRequests])

    // Données pour le LineChart des taux d'approbation
    const approvalData = useMemo(() => {
        const data = []
        const endDate = new Date()
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 6)

        for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
            const monthYear = d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
            const monthlyRequests = filteredRequests.filter(request => {
                const requestDate = new Date(request.createdAt || '')
                return requestDate.getMonth() === d.getMonth() &&
                    requestDate.getFullYear() === d.getFullYear()
            })

            const approvedCount = monthlyRequests.filter(request => request.status === RequestStatus.APPROVED).length
            const approvalRate = monthlyRequests.length > 0
                ? Math.round((approvedCount / monthlyRequests.length) * 100)
                : 0

            data.push({
                name: monthYear,
                value: approvalRate
            })
        }
        return data
    }, [filteredRequests])

    // Données pour le tableau récapitulatif
    const summaryData = useMemo(() => {
        if (!filteredRequests.length) return []

        return Object.values(RequestType).map(type => {
            const typeRequests = filteredRequests.filter(r => r.type === type)
            const total = typeRequests.length
            const processed = typeRequests.filter(r => r.status !== RequestStatus.PENDING).length
            const completed = typeRequests.filter(r => r.status === RequestStatus.COMPLETED).length

            return {
                type,
                label: REQUEST_TYPE_LABELS[type] || type,
                total,
                processed,
                completed,
                pending: total - processed
            }
        })
    }, [filteredRequests])

    // Données pour les graphiques de statut par type
    const statusByTypeData = useMemo(() => {
        if (!filteredRequests.length) return []

        return Object.values(RequestType).map(type => {
            const typeRequests = filteredRequests.filter(r => r.type === type)
            const statusCounts = typeRequests.reduce((acc: Record<RequestStatus, number>, request) => {
                acc[request.status] = (acc[request.status] || 0) + 1
                return acc
            }, {} as Record<RequestStatus, number>)

            return {
                type,
                label: REQUEST_TYPE_LABELS[type] || type,
                total: typeRequests.length,
                ...statusCounts
            }
        })
    }, [filteredRequests])

    // Données pour le graphique de répartition par type
    const typeData = useMemo(() => {
        if (!filteredRequests.length) return []

        const typeCounts = filteredRequests.reduce((acc: Record<RequestType, number>, request) => {
            acc[request.type] = (acc[request.type] || 0) + 1
            return acc
        }, {} as Record<RequestType, number>)

        const total = filteredRequests.length
        return Object.entries(typeCounts).map(([name, value]) => {
            const config = chartConfig[name as RequestType]
            return {
                name: name,
                value,
                percentage: Math.round((value / total) * 100),
                fill: config?.theme?.light || "hsl(var(--muted-foreground))"
            }
        })
    }, [filteredRequests])

    if (isLoading) {
        return <StatsSkeleton />
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <StatsHeader
                    title="Demandes"
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
                    {Object.entries(statusConfig).map(([key, config]) => {
                        // Skip individual APPROVED and REJECTED statuses
                        if (key === 'APPROVED_BY_DIRECTOR' ||
                            key === 'APPROVED_BY_SUPERVISOR' ||
                            key === 'REJECTED_BY_DIRECTOR' ||
                            key === 'REJECTED_BY_SUPERVISOR') {
                            return null;
                        }

                        let count = 0;
                        if (key === 'APPROVED') {
                            count = filteredRequests.filter(r =>
                                r.status === RequestStatus.APPROVED ||
                                r.status === RequestStatus.APPROVED_BY_DIRECTOR ||
                                r.status === RequestStatus.APPROVED_BY_SUPERVISOR
                            ).length;
                        } else if (key === 'REJECTED') {
                            count = filteredRequests.filter(r =>
                                r.status === RequestStatus.REJECTED ||
                                r.status === RequestStatus.REJECTED_BY_DIRECTOR ||
                                r.status === RequestStatus.REJECTED_BY_SUPERVISOR
                            ).length;
                        } else {
                            count = filteredRequests.filter(r => r.status === key).length;
                        }
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

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview" className="flex items-center gap-2">
                            <Table className="h-4 w-4" />
                            Vue d'ensemble
                        </TabsTrigger>
                        <TabsTrigger value="types" className="flex items-center gap-2">
                            <PieChartIcon className="h-4 w-4" />
                            Types de demandes
                        </TabsTrigger>
                        <TabsTrigger value="status" className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Statuts
                        </TabsTrigger>
                        <TabsTrigger value="evolution" className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Évolution
                        </TabsTrigger>
                    </TabsList>

                    {/* Vue d'ensemble */}
                    <TabsContent value="overview" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Table className="h-5 w-5 text-primary" />
                                    Récapitulatif par Type de Demande
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Vue d'ensemble des demandes par catégorie
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <UITable>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Type de Demande</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                            <TableHead className="text-right">En Attente</TableHead>
                                            <TableHead className="text-right">Traitées</TableHead>
                                            <TableHead className="text-right">Complétées</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {summaryData.map((row) => (
                                            <TableRow key={row.type}>
                                                <TableCell className="font-medium">{row.label}</TableCell>
                                                <TableCell className="text-right">{row.total.toString()}</TableCell>
                                                <TableCell className="text-right">{row.pending.toString()}</TableCell>
                                                <TableCell className="text-right">{row.processed.toString()}</TableCell>
                                                <TableCell className="text-right">{row.completed.toString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </UITable>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Types de demandes */}
                    <TabsContent value="types" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="col-span-2">
                                <DonutChart
                                    title="Répartition par Type"
                                    description="Distribution des types de demandes"
                                    data={typeData}
                                    config={chartConfig}
                                    total={filteredRequests.length}
                                    icon={PieChartIcon}
                                    hoveredSegment={hoveredSegment}
                                    onSegmentHover={setHoveredSegment}
                                    footerText={`Total: ${filteredRequests.length} demandes`}
                                    footerIcon={Activity}
                                />
                            </div>

                            {Object.values(RequestType).map((type) => {
                                const typeData = statusByTypeData.find(d => d.type === type)
                                if (!typeData) return null

                                const chartData = Object.entries(RequestStatus)
                                    .filter(([, status]) => typeData[status as RequestStatus] > 0)
                                    .map(([, status]) => ({
                                        name: status,
                                        value: typeData[status as RequestStatus],
                                        fill: statusConfig[status as keyof typeof statusConfig]?.theme?.light || "hsl(var(--muted-foreground))",
                                        badgeClass: statusConfig[status as keyof typeof statusConfig]?.badgeClass || ""
                                    }))

                                return (
                                    <div key={type}>
                                        <DonutChart
                                            title={REQUEST_TYPE_LABELS[type] || type}
                                            description="Répartition des statuts"
                                            data={chartData}
                                            config={statusConfig}
                                            total={typeData.total}
                                            icon={Package}
                                            hoveredSegment={hoveredSegment}
                                            onSegmentHover={setHoveredSegment}
                                            footerText={`Total: ${typeData.total} demandes`}
                                            footerIcon={Activity}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </TabsContent>

                    {/* Statuts */}
                    <TabsContent value="status" className="space-y-6">
                        <DonutChart
                            title="Répartition par Statut"
                            description="Distribution des statuts des demandes"
                            data={statusData}
                            config={statusConfig}
                            total={filteredRequests.length}
                            icon={Activity}
                            hoveredSegment={hoveredSegment}
                            onSegmentHover={setHoveredSegment}
                            footerText={`Total: ${filteredRequests.length} demandes`}
                            footerIcon={Activity}
                        />
                    </TabsContent>

                    {/* Évolution */}
                    <TabsContent value="evolution" className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <BarChartCard
                                title="Demandes Mensuelles"
                                description="Évolution des demandes sur la période"
                                data={monthlyData}
                                config={chartConfig}
                                icon={TrendingUp}
                                footerText="Période: 6 derniers mois"
                                footerIcon={Calendar}
                                barColor={chartConfig.PENDING?.theme?.light ?? "hsl(var(--chart-1))"}
                            />

                            <LineChartCard
                                title="Taux d'Approbation"
                                description="Pourcentage de demandes approuvées par mois"
                                data={approvalData}
                                config={chartConfig}
                                icon={DollarSign}
                                footerText="Période: 6 derniers mois"
                                footerIcon={Calendar}
                                lineColor={chartConfig.APPROVED?.theme?.light ?? "hsl(var(--chart-2))"}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default RequestsStats
