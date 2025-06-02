import { useEffect, useMemo, useState } from 'react'
import { TrendingUp, Users, Activity, Calendar } from 'lucide-react'
import { ManageUserService } from '../../services/manageUser.service'
import { toast } from 'sonner'
import { ChartConfig } from '../../components/ui/chart'
import { DateRangeFilter } from '../../components/dashboard/directeur/stats/DateRangeFilter'
import StatCard from '../../components/dashboard/directeur/stats/StatCard'
import { DonutChart } from '../../components/dashboard/directeur/stats/DonutChart'
import { LineChartCard } from '../../components/dashboard/directeur/stats/LineChartCard'
import { StatsHeader } from '../../components/dashboard/directeur/stats/StatsHeader'
import { StatsSkeleton } from '../../components/dashboard/directeur/stats/StatsSkeleton'
import { Role } from '../../types/request'
import { User } from '../../types/Member'


const chartConfig: ChartConfig = {
    DOCTORANT: {
        label: "Doctorant",
        theme: {
            light: "hsl(var(--chart-1))",
            dark: "hsl(var(--chart-1))"
        }
    },
    MASTER: {
        label: "Master",
        theme: {
            light: "hsl(var(--chart-2))",
            dark: "hsl(var(--chart-2))"
        }
    },
    ENSEIGNANT: {
        label: "Enseignant",
        theme: {
            light: "hsl(var(--chart-3))",
            dark: "hsl(var(--chart-3))"
        }
    },
    ADMIN: {
        label: "Admin",
        theme: {
            light: "hsl(var(--chart-4))",
            dark: "hsl(var(--chart-4))"
        }
    }
}

const MembersStats = () => {
    const manageUserService = new ManageUserService()
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await manageUserService.getUsers()
            setUsers(response.data.filter((user: User) => user.role !== Role.DIRECTEUR) || [])
        } catch (error: unknown) {
            console.error("Erreur lors de la recherche des membres:", error)
            toast.error("Une erreur s'est produite lors de la recherche des membres.")
            setUsers([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    // Filtrer les utilisateurs selon la période sélectionnée
    const filteredUsers = useMemo(() => {
        if (!startDate && !endDate) return users

        return users.filter(user => {
            const userDate = new Date(user.createdAt)
            if (startDate && endDate) {
                return userDate >= startDate && userDate <= endDate
            } else if (startDate) {
                return userDate >= startDate
            } else if (endDate) {
                return userDate <= endDate
            }
            return true
        })
    }, [users, startDate, endDate])

    // Données pour le PieChart des rôles
    const roleData = useMemo(() => {
        if (!filteredUsers.length) return []

        const roleCounts = filteredUsers.reduce((acc: Record<Role, number>, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1
            return acc
        }, {} as Record<Role, number>)

        const total = filteredUsers.length
        return Object.entries(roleCounts).map(([name, value]) => {
            const config = chartConfig[name as Role]
            const color = config?.theme?.light ?? "hsl(var(--chart-1))"
            return {
                name,
                value,
                percentage: Math.round((value / total) * 100),
                fill: color
            }
        })
    }, [filteredUsers])

    // Données pour le LineChart
    const activityData = useMemo(() => {
        const data = []
        const endDate = new Date()
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 6)

        for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
            const monthYear = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
            const count = filteredUsers.filter(user => {
                const userDate = new Date(user.createdAt)
                return userDate.getMonth() === d.getMonth() &&
                    userDate.getFullYear() === d.getFullYear()
            }).length

            data.push({
                name: monthYear,
                value: count
            })
        }

        return data
    }, [filteredUsers])

    if (isLoading) {
        return <StatsSkeleton />
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <StatsHeader
                    title="Membres"
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
                        const count = filteredUsers.filter(u => u.role === key).length
                        return (
                            <StatCard
                                key={key}
                                title={config.label as string}
                                value={count.toString()}
                                icon={Users}
                                backgroundColor={config.theme?.light ?? "hsl(var(--chart-1))"}
                            />
                        )
                    })}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <DonutChart
                        title="Répartition des Rôles"
                        description="Distribution des types de membres"
                        data={roleData}
                        config={chartConfig}
                        total={filteredUsers.length}
                        icon={Users}
                        hoveredSegment={hoveredSegment}
                        onSegmentHover={setHoveredSegment}
                        footerText={`Total: ${filteredUsers.length} membres actifs`}
                        footerIcon={Activity}
                    />

                    <LineChartCard
                        title="Activité Mensuelle"
                        description="Évolution de l'activité sur la période"
                        data={activityData}
                        config={chartConfig}
                        icon={TrendingUp}
                        footerText="Période: 6 derniers mois"
                        footerIcon={Calendar}
                        lineColor={chartConfig.DOCTORANT?.theme?.light ?? "hsl(var(--chart-1))"}
                    />
                </div>
            </div>
        </div>
    )
}

export default MembersStats