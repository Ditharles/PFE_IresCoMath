"use client"

import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
    loadingText?: string
    spinnerSize?: number
    spinnerColor?: string
    overlayOpacity?: number
    showSpinner?: boolean
    showProgressBar?: boolean
    progressValue?: number
}

export default function LoadingOverlay({
    loadingText = "Loading...",
    spinnerSize = 24,
    spinnerColor = "#3b82f6",
    overlayOpacity = 0.7,
    showSpinner = true,
    showProgressBar = false,
    progressValue = 0,
}: LoadingOverlayProps) {
    return (
        <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
            style={{
                backgroundColor: `rgba(255, 255, 255, ${overlayOpacity})`,
                backdropFilter: "blur(2px)",
                zIndex: 50,
            }}
        >
            {showSpinner && <Loader2 className="animate-spin mb-2" size={spinnerSize} color={spinnerColor} />}

            {loadingText && <p className="text-sm font-medium text-gray-800">{loadingText}</p>}

            {showProgressBar && (
                <div className="w-3/4 mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${progressValue}%` }}
                    ></div>
                </div>
            )}
        </div>
    )
}
