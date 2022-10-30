import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TasksContext } from "./context/TasksContext";
import { Lists } from "./components/lists/Lists";
import { Form } from "./components/form/Form";
import { Message } from "./components/message/Message";

export type TaskType = {
  content: string;
  done: boolean;
  createdAt: number;
};

function App() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("app:tasks", []);
  const [phrase, setPhrase] = useState<string>("");

  const filteredByPhrase = tasks?.filter((task) =>
    task.content.toLocaleLowerCase().includes(phrase.toLocaleLowerCase()),
  );

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <div className="container px-4 mx-auto flex flex-col w-full lg:w-1/2 gap-4">
        <Form setPhrase={setPhrase} phrase={phrase} />
        {tasks && tasks.length === 0 && (
          <Message content="Brak zadań do wyświetlenia" />
        )}
        {tasks && tasks.length > 0 && (
          <Lists filteredByPhrase={filteredByPhrase} />
        )}
      </div>
    </TasksContext.Provider>
  );
}

export default App;
