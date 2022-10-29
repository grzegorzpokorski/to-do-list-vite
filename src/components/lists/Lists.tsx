import React from "react";
import { TaskType } from "../../App";
import { useTasksContext } from "../../context/TasksContext";
import { List } from "../list/List";

type ListsProps = {
  filteredByPhrase: TaskType[];
};

export const Lists = ({ filteredByPhrase }: ListsProps) => {
  const { tasks, setTasks } = useTasksContext();

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
