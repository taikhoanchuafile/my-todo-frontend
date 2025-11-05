import api from "@/api/axios.js";
import AddTaskAndTitle from "@/components/AddTaskAndTitle";
import FilterCategories from "@/components/FilterCategories";
import PaginationPage from "@/components/PaginationPage";
import TasksList from "@/components/TasksList";
import { TasksContext } from "@/context/TasksContext";
import { visibleTasksNumberOnPage } from "@/lib/data";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const [tasksBuffer, setTasksBuffer] = useState([]);
  const [tasksTotalBy, setTasksTotalBy] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [pageTasksList, setPageTasksList] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/api/tasks`, {
        params: {
          status: statusFilter,
          priority: priorityFilter,
          page: pageTasksList,
          limit: visibleTasksNumberOnPage,
        },
      });
      setTasksBuffer(res.data.tasks);
      setTasksTotalBy(res.data.total);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu", error);
    }
  };

  // Tổng số trang
  const totalPage = Math.ceil(tasksTotalBy / visibleTasksNumberOnPage);
  const pages = useMemo(() => {
    let pages = [];
    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (pageTasksList < 7) {
        pages.push(1, 2, 3, 4, 5, 6, "...");
      } else if (pageTasksList > totalPage - 4) {
        pages.push(
          "...",
          totalPage - 5,
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else {
        pages.push(
          1,
          "...",
          pageTasksList - 1,
          pageTasksList,
          pageTasksList + 1,
          "...",
          totalPage
        );
      }
    }
    return pages;
  }, [pageTasksList, totalPage]);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter, pageTasksList]);

  useEffect(() => {
    setPageTasksList(1);
  }, [statusFilter, priorityFilter]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen w-full relative">
        {/* Spring Meadow Mist Gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(90deg, #D4F1C5 0%, #E8F5E8 20%, #F0F8E8 40%, #FFF9E6 60%, #FFE5B4 80%, #FFDAB9 100%)`,
          }}
        />

        <div className="container relative z-10">
          <div className="w-full lg:max-w-[80%] flex flex-col gap-4">
            <AddTaskAndTitle handleChange={fetchTasks} />
            <hr />
            <div className="flex gap-8">
              <TasksContext.Provider
                value={{
                  statusFilter,
                  setStatusFilter,
                  priorityFilter,
                  setPriorityFilter,
                  tasksTotalBy,
                }}
              >
                <FilterCategories />
              </TasksContext.Provider>
              {/* <FilterCategories
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                tasksTotalBy={tasksTotalBy}
              /> */}
              <div className="flex-1 flex flex-col gap-4">
                <TasksList
                  tasksBuffer={tasksBuffer}
                  handleChange={fetchTasks}
                />
                <PaginationPage
                  page={pageTasksList}
                  setPage={setPageTasksList}
                  pages={pages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
