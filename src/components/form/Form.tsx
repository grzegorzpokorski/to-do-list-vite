import React, { FormEvent } from "react";
import { useTasksContext } from "../../context/TasksContext";
import { MdClear } from "react-icons/md";

type FormProps = {
  setPhrase: (phrase: string) => void;
  phrase: string;
};

export const Form = ({ setPhrase, phrase }: FormProps) => {
  const { setTasks } = useTasksContext();

  const createTask = (content: string) => {
    return {
      content,
      done: false,
      createdAt: Date.now(),
    };
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = phrase.trim();

    if (!content) return;

    setTasks((prev) => [...prev, createTask(content)]);
    setPhrase("");
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex justify-between mt-4">
      <label htmlFor="form-phrase-input" className="sr-only">
        treść nowego zadania
      </label>
      <input
        type="text"
        onChange={(e) => setPhrase(e.target.value)}
        className="border-2 border-zinc-500 w-full px-2 active:outline-blue-500 focus:outline-blue-500 transition-colors"
        value={phrase}
        id="form-phrase-input"
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
        disabled={!phrase}
      />
    </form>
  );
};
