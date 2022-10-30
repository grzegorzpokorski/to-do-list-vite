import React from "react";
import { TaskType } from "../../App";
import { Task } from "../task/Task";

type ListProps = {
  tasks: TaskType[];
};

export const List = ({ tasks }: ListProps) => {
  return (
    <ul className="flex flex-col bg-blue-100 px-4 py-1">
      {tasks.map((task) => (
        <Task key={task.createdAt} task={task} />
      ))}
    </ul>
  );
};
