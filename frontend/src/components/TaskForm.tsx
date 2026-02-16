import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask(title, description);
    setTitle("");
    setDescription("");
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-8"
    >
      <input
        type="text"
        placeholder="Título..."
        value={title}
        onChange={handleTitleChange}
        className="bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        placeholder="Descripción..."
        value={description}
        onChange={handleDescriptionChange}
        rows={3}
        className="bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium transition"
      >
        Agregar tarea
      </button>
    </form>
  );
}

export default TaskForm;
