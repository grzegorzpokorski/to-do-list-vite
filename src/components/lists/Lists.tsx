import React from "react";
import { List } from "../list/List";
import { TaskType } from "../task/Task";

type ListsProps = {
  filteredByPhrase: TaskType[];
};

export const Lists = ({ filteredByPhrase }: ListsProps) => {
  const done = filteredByPhrase.filter((task) => task.done === true);
  const toDo = filteredByPhrase.filter((task) => task.done === false);

  return (
    <div className="flex flex-col gap-4">
      {toDo.length > 0 && <List tasks={toDo} />}
      {done.length > 0 && <List tasks={done} />}
    </div>
  );
};
