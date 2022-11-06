import React from "react";
import cn from "classnames";
import { FaTrashAlt } from "react-icons/fa";
import { useTasksContext } from "../../context/TasksContext";

export type TaskType = {
  content: string;
  done: boolean;
  createdAt: number;
};

type TaskProps = {
  task: TaskType;
};

export const Task = ({ task }: TaskProps) => {
  const { deleteTask, toggleTask } = useTasksContext();

  return (
    <li
      className={cn(
        "flex flex-row justify-between gap-4 items-center border-b-2 last:border-none border-white py-2",
        { "line-through": task.done },
      )}
    >
      {task.content}
      <div className="flex flex-row items-center gap-4">
        <label htmlFor={`${task.createdAt}-status`} className="sr-only">
          oznacz zadanie jako {task.done ? "do zrobienia" : "wykonane"}
        </label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTask(task.createdAt)}
          id={`${task.createdAt}-status`}
          className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        />
        <label htmlFor={`${task.createdAt}-detete`} className="sr-only">
          Usuń zadanie
        </label>
        <button
          onClick={() => deleteTask(task.createdAt)}
          id={`${task.createdAt}-detete`}
        >
          <FaTrashAlt className="hover:text-red-500 active:text-red-500 transition-colors" />
        </button>
      </div>
    </li>
  );
};
