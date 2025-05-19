import  { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '../utils';
import { Calendar } from '../ui/calendar';

interface DatePickerProps extends ControllerRenderProps<any, any> {
    className?: string;
}

export const DatePicker = ({ value, onChange, className }: DatePickerProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={className}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? (
                            format(new Date(value), "dd MMMM yyyy", { locale: fr })
                        ) : (
                            <span>Sélectionner une date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onSelect={(date) => {
                            onChange(date);
                            setOpen(false);
                        }}
                        initialFocus
                        locale={fr}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};