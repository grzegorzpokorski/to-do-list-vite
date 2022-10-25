import React from "react";
import { TaskType } from "../../App";
import cn from "classnames";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type ListsProps = {
  tasks: TaskType[];
};

export const Lists = ({ tasks }: ListsProps) => {
  const done = tasks.filter((task) => task.done === true);
  const notDone = tasks.filter((task) => task.done === false);

  return (
    <>
      {notDone && notDone.length > 0 && (
        <div>
          <h3>Do zrobienia:</h3>
          <List tasks={notDone} />
        </div>
      )}
      {done && done.length > 0 && (
        <div>
          <h3>Zrobione:</h3>
          <List tasks={done} />
        </div>
      )}
    </>
  );
};

type ListProps = {
  tasks: TaskType[];
};

const List = ({ tasks }: ListProps) => {
  // get tasks from context
  const handleChangeTaskStaus = ({ content, done, createdAt }: TaskType) => {
    console.log("klik");
  };
  //   if (!storedTasks) return;

  //   const updatedTask: TaskType = {
  //     content: content,
  //     done: !done,
  //     createdAt: createdAt,
  //   };

  //   const updatedTasks = storedTasks?.filter(
  //     (task) => task.createdAt !== createdAt
  //   );

  //   setStoredTasks([updatedTask, ...updatedTasks]);
  // };

  return (
    <ul className="flex flex-col ">
      {tasks.map((task) => (
        <li key={task.createdAt} className="flex justify-between gap-2">
          <p className={cn({ "line-through": task.done })}>{task.content}</p>
          <label>
            <span className="sr-only">
              oznacz jako {task.done ? "do zrobienia" : "zrobione"}
            </span>
            <input
              type="checkbox"
              onChange={() => handleChangeTaskStaus(task)}
              checked={task.done}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};
