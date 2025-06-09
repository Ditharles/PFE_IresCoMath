
import { Skeleton } from '../../../ui/skeleton'

interface StatsSkeletonProps {
    cardCount?: number
}

export const StatsSkeleton: React.FC<StatsSkeletonProps> = ({
    cardCount = 4
}) => {
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <Skeleton className="h-10 w-1/2 mx-auto" />
                    <Skeleton className="h-6 w-1/3 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {Array.from({ length: cardCount }).map((_, i) => (
                        <Skeleton key={i} className="h-24 rounded-lg" />
                    ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <Skeleton className="h-[450px] rounded-lg" />
                    <Skeleton className="h-[450px] rounded-lg" />
                </div>
            </div>
        </div>
    )
} 