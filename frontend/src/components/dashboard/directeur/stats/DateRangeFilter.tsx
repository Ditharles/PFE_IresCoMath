import React from 'react'
import { Filter, X } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Button } from '../../../ui/button'
import { Badge } from '../../../ui/badge'
import { DatePicker } from '../../../form/DatePicker'
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover'

interface DateRangeFilterProps {
    startDate: Date | undefined
    endDate: Date | undefined
    onStartDateChange: (date: Date | undefined) => void
    onEndDateChange: (date: Date | undefined) => void
    onReset: () => void
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onReset
}) => {
    return (
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filtrer par période
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date de début</label>
                            <DatePicker
                                value={startDate}
                                onChange={onStartDateChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date de fin</label>
                            <DatePicker
                                value={endDate}
                                onChange={onEndDateChange}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={onReset}
                            >
                                Réinitialiser
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {(startDate || endDate) && (
                <>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        className="h-8"
                    >
                        Réinitialiser
                    </Button>
                    <div className="flex items-center gap-2">
                        {startDate && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                Du {format(startDate, "dd MMMM yyyy", { locale: fr })}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={() => onStartDateChange(undefined)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        )}
                        {endDate && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                Au {format(endDate, "dd MMMM yyyy", { locale: fr })}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={() => onEndDateChange(undefined)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        )}
                    </div>
                </>
            )}
        </div>
    )
} 