import React from "react";
import { TaskType } from "../../App";

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
    console.log(tasks);
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
    <>
      {toDo && toDo.length > 0 && (
        <>
          <h3>do zrobienia:</h3>
          <ul>
            {toDo.map((task) => (
              <li key={task.createdAt}>
                {task.content}
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleChangeTaskStatus(task)}
                />
                <button onClick={() => handleDeleteTask(task)}>delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {done && done.length > 0 && (
        <>
          <h3>zrobione:</h3>
          <ul>
            {done.map((task) => (
              <li key={task.createdAt}>
                {task.content}
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleChangeTaskStatus(task)}
                />
                <button onClick={() => handleDeleteTask(task)}>delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
