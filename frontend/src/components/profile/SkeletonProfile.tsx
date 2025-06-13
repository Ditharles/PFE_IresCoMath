
import { Card, CardHeader, CardContent } from "../ui/card"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"


const SkeletonProfile = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
    <div className="mb-4">
      <Skeleton className="h-9 w-24" />
    </div>

    <Card className="shadow-sm border-border">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-muted/5 border-b">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        {/* Section Informations personnelles */}
        <div className="rounded-lg bg-muted/50 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-48" />
          </div>
          <Separator className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Section Informations académiques */}
        <div className="rounded-lg bg-muted/50 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-56" />
          </div>
          <Separator className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default SkeletonProfile