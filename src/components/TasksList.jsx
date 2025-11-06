import React from "react";
import TaskCard from "./TaskCard";
import NoTask from "./NoTask";

const TasksList = ({ tasksBuffer, handleChange }) => {
  if (tasksBuffer.length === 0) {
    return <NoTask />;
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center ">
      {tasksBuffer.map((task, index) => (
        <TaskCard
          handleChange={handleChange}
          key={index}
          task={task}
          index={index}
        />
      ))}
    </div>
  );
};

export default TasksList;
