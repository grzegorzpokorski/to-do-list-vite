import React from "react";
import { TaskType } from "../../App";
import { List } from "../list/List";

type ListsProps = {
  tasks: TaskType[];
  setTasks: (
    value: TaskType[] | ((val: TaskType[] | null) => TaskType[] | null) | null,
  ) => void;
  filteredByPhrase: TaskType[];
};

export const Lists = ({ tasks, setTasks, filteredByPhrase }: ListsProps) => {
  const done = filteredByPhrase.filter((task) => task.done === true);
  const toDo = filteredByPhrase.filter((task) => task.done === false);

  const handleChangeTaskStatus = (task: TaskType) => {
    const updatedTask = {
      ...task,
      done: !task.done,
    };

    const withoutUpdatedTask = tasks.filter(
      (v) => v.createdAt !== task.createdAt,
    );

    setTasks([updatedTask, ...withoutUpdatedTask]);
  };

  const handleDeleteTask = (task: TaskType) => {
    setTasks(tasks.filter((v) => v.createdAt !== task.createdAt));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {toDo && toDo.length > 0 && (
        <List
          tasks={toDo}
          handleDeleteTask={handleDeleteTask}
          handleChangeTaskStatus={handleChangeTaskStatus}
        />
      )}
      {done && done.length > 0 && (
        <List
          tasks={done}
          handleDeleteTask={handleDeleteTask}
          handleChangeTaskStatus={handleChangeTaskStatus}
        />
      )}
    </div>
  );
};
