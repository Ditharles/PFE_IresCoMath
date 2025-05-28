import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

interface DatePickerProps {
    value: Date | undefined;
    onChange: (date: Date) => void;
    className?: string;
}

export const DatePicker = ({ value, onChange, className }: DatePickerProps) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    const toggleCalendar = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowCalendar(!showCalendar);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);

    return (
        <div className={`relative ${className}`} ref={calendarRef}>
            <Button
                variant="outline"
                onClick={toggleCalendar}
                className="w-full justify-start text-left font-normal"
                type="button"
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? (
                    format(value, "dd MMMM yyyy", { locale: fr })
                ) : (
                    <span>Sélectionner une date</span>
                )}
            </Button>

            {showCalendar && (
                <div className="absolute  z-50 mt-1 bg-white border rounded-md shadow-lg p-2">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={(date) => {
                            if (date) {
                                onChange(date);
                                setShowCalendar(false);
                            }
                        }}
                        locale={fr}
                        initialFocus
                    />
                </div>
            )}
        </div>
    );
};