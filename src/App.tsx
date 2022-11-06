import React, { useState } from "react";
import { Lists } from "./components/lists/Lists";
import { Form } from "./components/form/Form";
import { Message } from "./components/message/Message";
import { useTasksContext } from "./context/TasksContext";

function App() {
  const { tasks } = useTasksContext();
  const [phrase, setPhrase] = useState<string>("");

  const filteredByPhrase = tasks.filter((task) =>
    task.content.toLocaleLowerCase().includes(phrase.toLocaleLowerCase()),
  );

  return (
    <div className="container px-4 mx-auto flex flex-col w-full lg:w-1/2 gap-4">
      <Form setPhrase={setPhrase} phrase={phrase} />
      {tasks && tasks.length === 0 ? (
        <Message content="Brak zadań do wyświetlenia" />
      ) : (
        <Lists filteredByPhrase={filteredByPhrase} />
      )}
    </div>
  );
}

export default App;
