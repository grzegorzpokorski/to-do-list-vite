import React, { FormEvent, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TasksContext } from "./context/TasksContext";
import { Lists } from "./components/lists/Lists";
import { MdClear } from "react-icons/md";

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
      <div className="container px-4 mx-auto flex flex-col w-full lg:w-1/2 gap-4">
        <form onSubmit={(e) => handleSubmitForm(e)}>
          <fieldset className="flex justify-between mt-4">
            <legend className="sr-only">Dodawanie nowego zadania</legend>
            <input
              type="text"
              onChange={(e) => setPhrase(e.target.value)}
              className="border-2 border-zinc-500 w-full px-2 active:outline-blue-500 focus:outline-blue-500 transition-colors"
              value={phrase}
            />
            {phrase && (
              <button
                type="reset"
                className="px-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white cursor-pointer border-white border-l-2 transition-colors"
                onClick={() => setPhrase("")}
              >
                <span className="sr-only">wyczyść pole</span>
                <MdClear />
              </button>
            )}
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-600 disabled:bg-blue-400 text-white cursor-pointer disabled:cursor-not-allowed px-4 py-2 border-white border-l-2 transition-colors"
              value="Dodaj zadanie"
              disabled={Boolean(!phrase)}
            />
          </fieldset>
        </form>
        {tasks && tasks.length === 0 && (
          <p className="text-center text-zinc-500">
            Brak zadań do wyświetlenia
          </p>
        )}
        {tasks && filteredByPhrase && (
          <Lists filteredByPhrase={filteredByPhrase} />
        )}
      </div>
    </TasksContext.Provider>
  );
}

export default App;
