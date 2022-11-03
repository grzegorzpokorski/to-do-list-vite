import { createContext, useContext } from "react";
import { TaskType } from "../App";

type TasksContextType = {
  tasks: TaskType[];
  setTasks: (value: React.SetStateAction<TaskType[]> | TaskType[]) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);

export const useTasksContext = () => {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) throw new Error("Missing data in TasksContext!");

  return tasksContext;
};
