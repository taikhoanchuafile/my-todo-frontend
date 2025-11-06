import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDownIcon, CirclePlus } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { vi } from "date-fns/locale";
import { priorities, status } from "@/lib/data";
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

const AddAndUpdateTask = ({
  open,
  setOpen,
  mode,
  addTask,
  defaultValues,
  updateTask,
}) => {
  const [openDate, setOpenDate] = useState(false);

  // kịch bản check valid chi tiết
  const schema = z.object({
    title: z.string().min(1, "Tên công việc không được để trống"),
    description: z.string().optional(),
    dueDate: z.coerce.date(), //tự chuyển new Date(...)
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), //kết nối  zod
    defaultValues: defaultValues || {
      title: "",
      description: "",
      dueDate: new Date(),
    },
    mode: "onSubmit", //thực hiện kết nối, valid khi nó onSubmit
  });

  const onSubmit = (data) => {
    if (mode === "add") {
      addTask(data);
    }
    if (mode === "edit") {
      updateTask(defaultValues._id, data);
    }
    reset();
    setOpen(false);
  };

  const onError = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  useEffect(() => {
    if (defaultValues && open) {
      reset(defaultValues);
    }
  }, [defaultValues, open]);

  return (
    <>
      {mode === "read" ? (
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="wrap-break-word whitespace-break-spaces overflow-auto max-h-100 max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold tracking-wide capitalize">
                  {defaultValues.title}
                </DialogTitle>
                <DialogDescription className="whitespace-normal wrap-break-word ">
                  {defaultValues.description}
                </DialogDescription>
              </DialogHeader>
              <div>
                <p>
                  <span className="font-bold">Ngày hết hạn:</span>{" "}
                  {format(defaultValues.dueDate, "eeee, dd/MM/yyyy", {
                    locale: vi,
                  })}
                </p>
                <p>
                  <span className="font-bold">Trạng thái:</span>{" "}
                  {
                    status.find((val) => val.value === defaultValues.status)
                      ?.label
                  }
                </p>
                <p>
                  <span className="font-bold">Độ khó:</span>{" "}
                  {
                    priorities.find(
                      (val) => val.value === defaultValues.priority
                    )?.label
                  }{" "}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        // UPDATE/DELETE-----------------------------------------------------
        <div>
          {/* Bảng add/update */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
              onInteractOutside={(e) => e.defaultValues()} //Ngăn chặn dialog click ra bị ẩn
              className="max-w-sm"
            >
              <DialogHeader>
                <DialogTitle>
                  {mode === "add" && "Thêm công việc"}
                  {mode === "edit" && "Cập nhật công việc"}
                  {/* {mode === "read" && "Chi tiết công việc"} */}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="grid gap-4">
                  {/* title */}
                  <div className="grid gap-3">
                    <Label htmlFor="title">Tên công việc</Label>
                    <Input
                      // disabled={mode === "read"}
                      {...register("title")}
                      id="title"
                    />
                  </div>

                  {/* desc */}
                  <div className="grid gap-3">
                    <Label htmlFor="description">Mô tả công việc</Label>
                    <Textarea
                      // disabled={mode === "read"}
                      {...register("description")}
                      id="description"
                      placeholder="Mô tả cho công việc..."
                      className="max-h-60 md: "
                    />
                  </div>

                  {/* date picker */}
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                      Ngày hết hạn
                    </Label>
                    <Controller
                      name="dueDate"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Popover open={openDate} onOpenChange={setOpenDate}>
                            <PopoverTrigger asChild>
                              <Button
                                // disabled={mode === "read"}
                                variant="outline"
                                id="dueDate"
                                className="w-48 justify-between font-normal"
                              >
                                {/* {date ? date.toLocaleDateString() : "Select date"} */}
                                {field.value
                                  ? format(field.value, "dd/MM/yyyy")
                                  : "Chọn ngày..."}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                captionLayout="dropdown"
                                onSelect={(newDate) => {
                                  field.onChange(newDate);
                                  setOpenDate(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        );
                      }}
                    />
                  </div>

                  {/* CTA */}
                  <div className="flex justify-end gap-2 mt-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Hủy</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Bạn có chắc làm điều này không?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Khi bạn hủy, mọi dữ liệu mà bạn đã sửa sẽ không được
                            lưu. Bạn có chắc vẫn hủy?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction onClick={() => setOpen(false)}>
                            Tiếp tục
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button type="submit">
                      {mode === "edit" ? "Lưu" : "Thêm"}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default AddAndUpdateTask;
