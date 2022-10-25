import React, { FormEvent, useEffect, useState } from "react";
import { Lists } from "./components/lists/Lists";
import { useLocalStorage } from "./hooks/useLocalStorage";

export type TaskType = {
  content: string;
  done: boolean;
  createdAt: number;
};

function App() {
  const [tasks, setTasks] = useLocalStorage<TaskType[] | null>(
    "app:tasks",
    null
  );
  const [phrase, setPhrase] = useState<string>("");

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof phrase !== "string" || phrase === "") return;

    const newTask = {
      content: phrase,
      done: false,
      createdAt: new Date().getTime(),
    };

    if (tasks) {
      setTasks([newTask, ...tasks]);
    } else {
      setTasks([newTask]);
    }

    setPhrase("");
  };

  return (
    <div className="container px-4 mx-auto">
      <form onSubmit={(e) => handleSubmitForm(e)} className="flex">
        <input
          type="text"
          onChange={(e) => setPhrase(e.target.value)}
          className="border-2 border-zinc-500"
          value={phrase}
        />
        <input
          type="submit"
          className="bg-zinc-800 text-white cursor-pointer"
        />
      </form>
      {tasks && (
        <Lists
          tasks={tasks.filter((task) =>
            task.content.toLowerCase().includes(phrase.toLowerCase())
          )}
        />
      )}
    </div>
  );
}

export default App;
