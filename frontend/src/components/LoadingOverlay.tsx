import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
    loadingText?: string
    spinnerSize?: number
    overlayOpacity?: number
    showSpinner?: boolean
    showProgressBar?: boolean
    progressValue?: number
}

export default function LoadingOverlay({
    loadingText = "Chargement...",
    spinnerSize = 24,
    overlayOpacity = 0.7,
    showSpinner = true,
    showProgressBar = false,
    progressValue = 0,
}: LoadingOverlayProps) {
    return (
        <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm border border-border"
            style={{
                opacity: overlayOpacity,
                zIndex: 50,
            }}
        >
            {showSpinner && <Loader2 className="animate-spin mb-2 text-primary" size={spinnerSize} />}

            {loadingText && <p className="text-sm font-medium text-foreground">{loadingText}</p>}

            {showProgressBar && (
                <div className="w-3/4 mt-4 bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${progressValue}%` }}
                    ></div>
                </div>
            )}
        </div>
    )
}
