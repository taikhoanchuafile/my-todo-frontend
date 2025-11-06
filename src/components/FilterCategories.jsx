import { X } from "lucide-react";
import FilterByPriority from "./FilterByPriority";
import FilterByStatus from "./FilterByStatus";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useContext } from "react";
import { TasksContext } from "@/context/TasksContext";
import FilterByPrioritySM from "./FilterByPrioritySM";
import FilterByStatusSM from "./FilterByStatusSM";

const FilterCategories = () => {
  const {
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    tasksTotalBy,
  } = useContext(TasksContext);
  return (
    <>
      <div className="flex justify-between md:hidden gap-2 md:gap-4">
        <FilterByStatusSM />
        <div className="hidden sm:flex flex-col items-center justify-center">
          {statusFilter === "" && priorityFilter === ""
            ? "Bạn đang có:"
            : "Sau khi lọc, bạn có:"}
          <Label className="text-3xl text-blue-700 font-bold">
            {tasksTotalBy}
          </Label>
          Công việc
        </div>
        <FilterByPrioritySM />
      </div>
      <div className="hidden md:flex flex-col gap-8">
        <FilterByStatus />
        <FilterByPriority />
        <div className="flex flex-col items-center justify-center">
          {statusFilter === "" && priorityFilter === ""
            ? "Bạn đang có:"
            : "Sau khi lọc, bạn có:"}
          <Label className="text-3xl text-blue-700 font-bold">
            {tasksTotalBy}
          </Label>
          Công việc
        </div>
        {/* {statusFilter === "" && priorityFilter === "" ? (
          ""
        ) : (
          <Button
            onClick={() => {
              setPriorityFilter("");
              setStatusFilter("");
            }}
          >
            <X /> Hủy lọc
          </Button>
        )} */}
      </div>
    </>
  );
};

export default FilterCategories;
