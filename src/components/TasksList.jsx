import React from "react";
import TaskCard from "./TaskCard";

const TasksList = ({ tasksBuffer, handleChange }) => {
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
