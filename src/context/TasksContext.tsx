import React, { createContext, ReactNode, useContext } from "react";
import { TaskType } from "../components/task/Task";
import { useLocalStorage } from "../hooks/useLocalStorage";

type TasksContextType = {
  tasks: TaskType[];
  setTasks: (value: React.SetStateAction<TaskType[]> | TaskType[]) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);

export const useTasksContext = () => {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) throw new Error("Missing data in TasksContext!");

  return tasksContext;
};

type TasksContextProviderProps = {
  children: ReactNode;
};

export const TasksContextProvider = ({
  children,
}: TasksContextProviderProps) => {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("app:tasks", []);

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((v) => v.createdAt !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.createdAt === id ? { ...t, done: !t.done } : t)),
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
