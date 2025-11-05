import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TasksContext } from "@/context/TasksContext";
import { status } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useContext } from "react";

const FilterByStatus = () => {
  const { statusFilter, setStatusFilter } = useContext(TasksContext);

  const handleChange = (value) => {
    setStatusFilter(value);
  };
  return (
    <div>
      <h1 className="font-semibold py-4">Lọc theo trạng thái</h1>
      <RadioGroup
        defaultValue="comfortable"
        className="flex flex-col gap-4"
        onValueChange={(value) => handleChange(value)}
      >
        {status.map((sta, index) => (
          <div
            key={sta.value}
            className="flex items-center justify-center gap-3"
          >
            <RadioGroupItem
              value={sta.value}
              id={sta.value}
              className="peer sr-only"
              checked={sta.value === statusFilter}
            />
            <Label
              htmlFor={sta.value}
              className={cn(
                "flex items-center justify-center gap-2 border rounded-xl px-4 py-2 cursor-pointer peer-data-[state=checked]:scale-150 peer-data-[state=checked]:text-white transition-all duration-500",
                index === 0
                  ? "bg-gray-400"
                  : index === 1
                  ? "bg-yellow-500"
                  : "bg-green-600"
              )}
            >
              {sta.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterByStatus;
