import React, { FormEvent, useState } from "react";
import { Lists } from "./components/lists/Lists";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { MdClear } from "react-icons/md";
import { TasksContext } from "./context/TasksContext";

export type TaskType = {
  content: string;
  done: boolean;
  createdAt: number;
};

function App() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("app:tasks", []);
  const [phrase, setPhrase] = useState<string>("");

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phrase.trim() === "") return;

    const newTask = {
      content: phrase.trim(),
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

  const filteredByPhrase = tasks?.filter((task) =>
    task.content.toLocaleLowerCase().includes(phrase.toLocaleLowerCase()),
  );

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <div className="container px-4 mx-auto flex flex-col w-full lg:w-1/2">
        <form onSubmit={(e) => handleSubmitForm(e)} className="">
          <div className="flex justify-between mt-4">
            <input
              type="text"
              onChange={(e) => setPhrase(e.target.value)}
              className="border-2 border-zinc-500 w-full px-2 active:outline-blue-500 focus:outline-blue-500 transition-colors"
              value={phrase}
            />
            {phrase && (
              <button
                type="reset"
                value=""
                className="px-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white cursor-pointer border-white border-l-2 transition-colors"
                onClick={() => setPhrase("")}
              >
                <span className="sr-only">wyczyść pole</span>
                <MdClear />
              </button>
            )}
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white cursor-pointer px-4 py-2 border-white border-l-2 transition-colors"
              value="Dodaj zadanie"
            />
          </div>
        </form>
        {tasks && filteredByPhrase && (
          <Lists filteredByPhrase={filteredByPhrase} />
        )}
      </div>
    </TasksContext.Provider>
  );
}

export default App;
