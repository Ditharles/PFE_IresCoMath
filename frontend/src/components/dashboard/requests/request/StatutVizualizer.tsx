"use client"

import type React from "react"

import { Clock, CheckCircle, XCircle, FileCheck, Archive, User, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip"
import { cn } from "../../../utils"
import { Badge } from "../../../ui/badge"
import { Card, CardContent } from "../../../ui/card"


enum RequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    APPROVED_BY_SUPERVISOR = "APPROVED_BY_SUPERVISOR",
    APPROVED_BY_DIRECTOR = "APPROVED_BY_DIRECTOR",
    REJECTED_BY_SUPERVISOR = "REJECTED_BY_SUPERVISOR",
    REJECTED_BY_DIRECTOR = "REJECTED_BY_DIRECTOR",
    REJECTED = "REJECTED",
    COMPLETED = "COMPLETED",
    CLOSED = "CLOSED",
}

interface StatusVisualizerProps {
    status: RequestStatus
    className?: string
}

const steps = [
    {
        id: 1,
        name: "En attente",
        description: "Demande soumise et en attente de traitement",
        icon: Clock,
    },
    {
        id: 2,
        name: "Évaluation",
        description: "Demande en cours d'évaluation par les responsables",
        icon: User,
    },
    {
        id: 3,
        name: "Complété",
        description: "Demande traitée et complétée",
        icon: FileCheck,
    },
    {
        id: 4,
        name: "Clôturé",
        description: "Processus terminé et archivé",
        icon: Archive,
    },
]

const statusLabels: Record<RequestStatus, string> = {
    [RequestStatus.PENDING]: "En attente",
    [RequestStatus.APPROVED]: "Approuvé",
    [RequestStatus.APPROVED_BY_SUPERVISOR]: "Approuvé par le superviseur",
    [RequestStatus.APPROVED_BY_DIRECTOR]: "Approuvé par le directeur",
    [RequestStatus.REJECTED]: "Rejeté",
    [RequestStatus.REJECTED_BY_SUPERVISOR]: "Rejeté par le superviseur",
    [RequestStatus.REJECTED_BY_DIRECTOR]: "Rejeté par le directeur",
    [RequestStatus.COMPLETED]: "Complété",
    [RequestStatus.CLOSED]: "Clôturé",
}

const StatusVisualizer: React.FC<StatusVisualizerProps> = ({ status, className }) => {
    const getActiveStep = (currentStatus: RequestStatus): number => {
        switch (currentStatus) {
            case RequestStatus.PENDING:
                return 1
            case RequestStatus.APPROVED:
            case RequestStatus.APPROVED_BY_SUPERVISOR:
            case RequestStatus.APPROVED_BY_DIRECTOR:
            case RequestStatus.REJECTED:
            case RequestStatus.REJECTED_BY_SUPERVISOR:
            case RequestStatus.REJECTED_BY_DIRECTOR:
                return 2
            case RequestStatus.COMPLETED:
                return 3
            case RequestStatus.CLOSED:
                return 4
            default:
                return 1
        }
    }

    const isRejected = (currentStatus: RequestStatus): boolean => {
        return [RequestStatus.REJECTED, RequestStatus.REJECTED_BY_SUPERVISOR, RequestStatus.REJECTED_BY_DIRECTOR].includes(
            currentStatus,
        )
    }

    const isApproved = (currentStatus: RequestStatus): boolean => {
        return [
            RequestStatus.APPROVED,
            RequestStatus.APPROVED_BY_SUPERVISOR,
            RequestStatus.APPROVED_BY_DIRECTOR,
            RequestStatus.COMPLETED,
            RequestStatus.CLOSED,
        ].includes(currentStatus)
    }

    const activeStep = getActiveStep(status)
    const rejected = isRejected(status)
    const approved = isApproved(status)

    const getStepStatus = (stepId: number) => {
        if (stepId < activeStep) return "completed"
        if (stepId === activeStep) {
            if (rejected) return "rejected"
            if (approved) return "approved"
            return "current"
        }
        return "pending"
    }

    const getStepIcon = (step: (typeof steps)[0], stepStatus: string) => {
        const IconComponent = step.icon

        if (stepStatus === "rejected") return <XCircle className="w-4 h-4" />
        if (stepStatus === "completed" || stepStatus === "approved") return <CheckCircle className="w-4 h-4" />
        if (stepStatus === "current") return <IconComponent className="w-4 h-4" />
        return <IconComponent className="w-4 h-4" />
    }

    const getStepColors = (stepStatus: string) => {
        switch (stepStatus) {
            case "completed":
            case "approved":
                return {
                    circle: "bg-green-500 dark:bg-green-600 text-white border-green-500 dark:border-green-600",
                    text: "text-green-600 dark:text-green-400",
                    line: "bg-green-500 dark:bg-green-600",
                }
            case "rejected":
                return {
                    circle: "bg-destructive text-destructive-foreground border-destructive",
                    text: "text-destructive",
                    line: "bg-destructive",
                }
            case "current":
                return {
                    circle: "bg-primary text-primary-foreground border-primary ring-4 ring-primary/20",
                    text: "text-primary font-semibold",
                    line: "bg-muted",
                }
            default:
                return {
                    circle: "bg-muted text-muted-foreground border-muted",
                    text: "text-muted-foreground",
                    line: "bg-muted",
                }
        }
    }

    const getStatusVariant = () => {
        if (rejected) return "destructive"
        if (approved) return "default"
        return "secondary"
    }

    return (
        <TooltipProvider>
            <Card className={cn("w-full border-0 shadow-none", className)}>
                <CardContent className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">Statut de la demande</h3>
                        <Badge variant={getStatusVariant()} className="text-sm font-medium">
                            {statusLabels[status]}
                        </Badge>
                    </div>

                    <div className="relative">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => {
                                const stepStatus = getStepStatus(step.id)
                                const colors = getStepColors(stepStatus)
                                const isLast = index === steps.length - 1

                                return (
                                    <div key={step.id} className="flex items-center flex-1">
                                        <div className="flex flex-col items-center">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className={cn(
                                                            "flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 cursor-help hover:scale-105",
                                                            colors.circle,
                                                            stepStatus === "current" && "animate-pulse",
                                                        )}
                                                        role="status"
                                                        aria-label={`Étape ${step.id}: ${step.name} - ${stepStatus === "completed" ? "Terminé" : stepStatus === "current" ? "En cours" : "En attente"}`}
                                                    >
                                                        {getStepIcon(step, stepStatus)}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    side="top"
                                                    className="max-w-xs p-3 bg-popover border border-border shadow-lg"
                                                >
                                                    <div className="text-center space-y-1">
                                                        <p className="font-semibold text-popover-foreground">{step.name}</p>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {step.description}
                                                        </p>
                                                        <div className="pt-1">
                                                            <span className={cn(
                                                                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                                                stepStatus === "completed" || stepStatus === "approved"
                                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                                    : stepStatus === "rejected"
                                                                        ? "bg-destructive/10 text-destructive"
                                                                        : stepStatus === "current"
                                                                            ? "bg-primary/10 text-primary"
                                                                            : "bg-muted text-muted-foreground"
                                                            )}>
                                                                {stepStatus === "completed" || stepStatus === "approved" ? "Terminé" :
                                                                    stepStatus === "rejected" ? "Rejeté" :
                                                                        stepStatus === "current" ? "En cours" : "En attente"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>

                                            <div className="mt-3 text-center">
                                                <p className={cn("text-xs font-medium", colors.text)}>{step.name}</p>
                                            </div>
                                        </div>

                                        {!isLast && (
                                            <div className="flex-1 mx-4">
                                                <div
                                                    className={cn(
                                                        "h-0.5 transition-all duration-500 rounded-full",
                                                        stepStatus === "completed" || stepStatus === "approved" ? colors.line : "bg-muted",
                                                    )}
                                                    role="presentation"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Status details */}
                    <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/50">
                        <div className="flex items-start space-x-3">
                            {rejected ? (
                                <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                            ) : approved ? (
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            ) : (
                                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-foreground mb-1">{statusLabels[status]}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {rejected && "La demande a été rejetée. Veuillez consulter les commentaires pour plus de détails."}
                                    {approved && status === RequestStatus.CLOSED && "La demande a été complétée et archivée avec succès."}
                                    {approved && status === RequestStatus.COMPLETED && "La demande a été traitée et complétée."}
                                    {approved &&
                                        status !== RequestStatus.COMPLETED &&
                                        status !== RequestStatus.CLOSED &&
                                        "La demande a été approuvée et est en cours de traitement."}
                                    {!rejected && !approved && "La demande est en attente de traitement."}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    )
}

export default StatusVisualizer