import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  Filter,
  FilterIcon,
  FilterX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { status } from "@/lib/data";
import { TasksContext } from "@/context/TasksContext";

const FilterByStatusSM = () => {
  const [open, setOpen] = React.useState(false);
  const { statusFilter, setStatusFilter } = React.useContext(TasksContext);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
        >
          <Filter />
          {status.find((val) => val.value === statusFilter)?.label ||
            "Lọc theo trạng thái"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No sta found.</CommandEmpty>
            <CommandGroup>
              {status.map((sta) => (
                <CommandItem
                  key={sta.value}
                  value={sta.value}
                  onSelect={(currentValue) => {
                    setStatusFilter(currentValue);
                    setOpen(false);
                  }}
                >
                  {sta.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      statusFilter === sta.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterByStatusSM;
