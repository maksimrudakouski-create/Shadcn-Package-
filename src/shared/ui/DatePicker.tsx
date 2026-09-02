import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type DatePickerProps = {
  id: string;
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
  invalid?: boolean;
};

function formatDate(date?: Date) {
  if (!date) return "Select date";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DatePicker({ id, value, onValueChange, invalid = false }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={invalid}>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              id={id}
              type="button"
              variant="outline"
              aria-invalid={invalid || undefined}
              className="w-full justify-between font-normal"
            >
              <span className={value ? "text-foreground" : "text-muted-foreground"}>
                {formatDate(value)}
              </span>
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onValueChange(date);
              setOpen(false);
            }}
            disabled={{ after: new Date() }}
            captionLayout="dropdown"
            startMonth={new Date(1920, 0)}
            endMonth={new Date()}
          />
        </PopoverContent>
      </Popover>
      <TooltipContent side="bottom" sideOffset={8}>
        This field is required.
      </TooltipContent>
    </Tooltip>
  );
}
