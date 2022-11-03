import React from "react";
import { TaskType } from "../../App";
import { List } from "../list/List";

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
