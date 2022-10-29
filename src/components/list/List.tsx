import React from "react";
import { TaskType } from "../../App";
import { Task } from "../task/Task";

type ListProps = {
  tasks: TaskType[];
  handleDeleteTask: (task: TaskType) => void;
  handleChangeTaskStatus: (task: TaskType) => void;
};

export const List = ({
  tasks,
  handleDeleteTask,
  handleChangeTaskStatus,
}: ListProps) => {
  return (
    <div className="flex flex-col bg-blue-100 px-4 py-1">
      <ul className="flex flex-col">
        {tasks.map((task) => (
          <Task
            key={task.createdAt}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleChangeTaskStatus={handleChangeTaskStatus}
          />
        ))}
      </ul>
    </div>
  );
};
