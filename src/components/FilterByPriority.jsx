import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TasksContext } from "@/context/TasksContext";
import { priorities } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useContext } from "react";

const FilterByPriority = () => {
  const { priorityFilter, setPriorityFilter } = useContext(TasksContext);

  const handleChange = (value) => {
    setPriorityFilter(value);
  };
  return (
    <div>
      <h1 className="font-semibold py-4 capitalize">Lọc theo độ ưu tiên</h1>
      <RadioGroup
        defaultValue={priorityFilter}
        className="flex flex-col gap-4"
        onValueChange={(value) => handleChange(value)}
      >
        {priorities.map((priority, index) => (
          <div
            key={priority.value}
            className="flex items-center justify-center gap-3"
          >
            <RadioGroupItem
              value={priority.value}
              id={priority.value}
              className="peer sr-only"
              checked={priority.value === priorityFilter}
            />
            <Label
              htmlFor={priority.value}
              className={cn(
                "flex items-center justify-center gap-2 border rounded-xl px-4 py-2 cursor-pointer peer-data-[state=checked]:scale-150 peer-data-[state=checked]:text-white transition-all duration-500",
                index === 0
                  ? "bg-blue-500"
                  : index === 1
                  ? "bg-orange-500"
                  : "bg-red-500"
              )}
            >
              {priority.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterByPriority;
