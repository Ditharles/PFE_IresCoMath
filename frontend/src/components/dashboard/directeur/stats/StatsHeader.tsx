

interface StatsHeaderProps {
    title: string
    description: string
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({
    title,
    description
}) => {
    return (
        <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
                Statistiques des <span className="text-primary">{title}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
                {description}
            </p>
        </div>
    )
} 