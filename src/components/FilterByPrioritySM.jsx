import * as React from "react";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
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
import { priorities } from "@/lib/data";
import { useContext } from "react";
import { TasksContext } from "@/context/TasksContext";

const FilterByPrioritySM = () => {
  const [open, setOpen] = React.useState(false);
  const { priorityFilter, setPriorityFilter } = useContext(TasksContext);

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
          {priorities.find((val) => val.value === priorityFilter)?.label ||
            "Lọc theo mức độ"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {priorities.map((priority) => (
                <CommandItem
                  key={priority.value}
                  value={priority.value}
                  onSelect={(currentValue) => {
                    setPriorityFilter(currentValue);
                    setOpen(false);
                  }}
                >
                  {priority.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      priorityFilter === priority.value
                        ? "opacity-100"
                        : "opacity-0"
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

export default FilterByPrioritySM;
