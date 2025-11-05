import { CirclePlus } from "lucide-react";
import AddAndUpdateTask from "./AddAndUpdateTask";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-toastify";
import { data } from "react-router";

const AddTaskAndTitle = ({ handleChange }) => {
  const [open, setOpen] = useState(false);
  const addTask = async (data) => {
    try {
      await api.post("/api/tasks", data);
      toast.success("Thêm công việc mới thành công!");
      handleChange();
    } catch (error) {
      console.error("Thêm mới thất bại!", error);
      toast.error("Thêm công việc mới thất bại!");
    }
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <h1 className="text-4xl font-bold tracking-wide capitalize">
        Kế hoạch của bạn là gì!
      </h1>
      <div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-blue-500 text-base cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Thêm task
        </Button>
        <AddAndUpdateTask
          addTask={addTask}
          open={open}
          setOpen={setOpen}
          mode="add"
        />
      </div>
    </div>
  );
};

export default AddTaskAndTitle;
