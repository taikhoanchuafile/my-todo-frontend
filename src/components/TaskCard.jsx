import {
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import AddAndUpdateTask from "./AddAndUpdateTask";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { priorities, status } from "@/lib/data";
import { format } from "date-fns";
import { da, vi } from "date-fns/locale";
import { toast } from "react-toastify";
import api from "@/api/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TaskCard = ({ task, index, handleChange }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("read");

  const updateTask = async (id, data) => {
    try {
      await api.put(`/api/tasks/${id}`, data);
      toast.success("Cập nhật công việc thành công!");
      handleChange();
    } catch (error) {
      console.error("Lỗi khi update dữ liệu!", error);
      toast.error("Lỗi khi cập nhật công việc!");
    }
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/api/tasks/${task._id}`);
      toast.success("Xóa công việc thành công!");
      handleChange();
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu!", error);
      toast.error("Lỗi khi xóa công việc công việc!");
    }
  };

  const handleToggleStatus = async () => {
    try {
      const statusValues = status.map((val) => val.value);
      const currentIndex = statusValues.indexOf(task.status);
      const nextStatusIndex = (currentIndex + 1) % statusValues.length;
      await api.put(`/api/tasks/${task._id}`, {
        status: statusValues[nextStatusIndex],
      });
      toast.success("Cập nhật trạng thái công việc thành công!");
      handleChange();
    } catch (error) {
      console.error("Lỗi khi update trạng thái dữ liệu!", error);
      toast.error("Lỗi khi cập nhật trạng thái công việc!");
    }
  };

  const handleTogglePriority = async () => {
    try {
      const priorityValues = priorities.map((val) => val.value);
      const currentIndex = priorityValues.indexOf(task.priority);
      const nextPriorityIndex = (currentIndex + 1) % priorityValues.length;
      await api.put(`/api/tasks/${task._id}`, {
        priority: priorityValues[nextPriorityIndex],
      });
      console.log(priorityValues);

      toast.success("Cập nhật mức độ công việc thành công!");
      handleChange();
    } catch (error) {
      console.error("Lỗi khi update priority dữ liệu!", error);
      toast.error("Lỗi khi cập nhật mức độ công việc!");
    }
  };

  return (
    <div className="w-full">
      <Card
        className={`flex gap-1 px-4 py-2 group ${
          task.status === "completed"
            ? "bg-neutral-500"
            : task.status === "pending"
            ? "bg-neutral-200"
            : ""
        }`}
      >
        <div className="min-w-full flex items-center justify-between">
          <Badge
            onClick={handleToggleStatus}
            className={cn(
              "text-xs md:text-sm capitalize cursor-pointer hover:scale-110 hover:shadow-[0_4px_8px_-2px_#000] transition duration-500",
              task.status === "pending"
                ? "bg-gray-400"
                : task.status === "in-progress"
                ? "bg-yellow-500"
                : "bg-green-600"
            )}
          >
            {task.status === "pending"
              ? "Chờ"
              : task.status === "in-progress"
              ? "Đang tiến hành"
              : "Hoàn thành"}
          </Badge>

          {/* Nút sửa và xóa */}
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setOpen(true);
                setMode("read");
              }}
              variant=""
              size="icon"
              className="cursor-pointer size-8 md:size-9"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              onClick={() => {
                setOpen(true);
                setMode("edit");
              }}
              variant="secondary"
              size="icon"
              className="cursor-pointer size-8 md:size-9"
            >
              <Pencil className="size-4" />
            </Button>

            {/* Xóa */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="cursor-pointer size-8 md:size-9"
                >
                  <Trash2 className="size-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc làm điều này</AlertDialogTitle>
                  <AlertDialogDescription>
                    Nếu bạn xóa, bạn sẽ không thể khôi phục được. Bạn có muốn
                    xóa?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteTask}>
                    Tiếp tục
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold capitalize line-clamp-1 wrap-break-word wrap">
          {task.title.length > 50
            ? task.title.slice(1, 50) + "..."
            : task.title}
        </h1>
        <p className="text-sm md:text-base">
          {task.description.length > 50
            ? task.description.slice(1, 50) + "..."
            : task.description}
        </p>
        <div className="flex gap-2  md:gap-4">
          {/* Hạn hoàn thành */}
          <p className="text-xs md:text-sm text-neutral-500 my-2">
            <span className="text-xs md:text-sm font-bold uppercase text-neutral-700 rounded-md mt-2">
              Hạn:
            </span>{" "}
            {task.dueDate &&
              format(task.dueDate, "eeee, dd/MM/yyyy", {
                locale: vi,
              })}
            {/* {new Date(task.dueDate).toLocaleString()} */}
          </p>

          {/* mức độ */}
          <Badge
            onClick={handleTogglePriority}
            className={cn(
              "text-xs md:text-sm rounded-md capitalize cursor-pointer hover:scale-110 hover:shadow-[0_4px_8px_-2px_#000] transition duration-500",
              task.priority === "low"
                ? "bg-blue-500"
                : task.priority === "medium"
                ? "bg-orange-500"
                : "bg-red-500 "
            )}
          >
            {task.priority === "low" ? (
              <CircleDashed className="size-4" />
            ) : task.priority === "medium" ? (
              <CircleDotDashed className="size-4" />
            ) : (
              <CircleDot className="size-4" />
            )}
            {task.priority === "low"
              ? "Thấp"
              : task.priority === "medium"
              ? "Trung bình"
              : "Cao"}
          </Badge>
        </div>
      </Card>
      <AddAndUpdateTask
        mode={mode}
        open={open}
        setOpen={setOpen}
        defaultValues={task}
        updateTask={updateTask}
      />
    </div>
  );
};

export default TaskCard;
