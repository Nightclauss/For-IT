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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={handleTitleChange}
      />

      <textarea
        placeholder="Descripción..."
        value={description}
        onChange={handleDescriptionChange}
      />

      <button type="submit">Agregar</button>
    </form>
  );
}

export default TaskForm;
