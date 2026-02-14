import { useEffect, useState } from "react";
import type { Task } from "./types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const API_URL: string = import.meta.env.VITE_API_URL;
  fetch(`${API_URL}/api/tasks`)


  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then(response => response.json())
      .then((data: Task[]) => setTasks(data))
      .catch((error: unknown) => console.error("Error:", error));
  }, []);

  const addTask = (title: string, description: string) => {
    fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description })
    })
      .then(response => response.json())
      .then((newTask: Task) => {
        setTasks(prev => [...prev, newTask]);
      })
      .catch((error: unknown) => console.error("Error:", error));
  };

  const toggleTask = (task: Task) => {
    fetch(`${API_URL}/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    })
      .then(response => response.json())
      .then((updatedTask: Task) => {
        setTasks(prev =>
          prev.map(t =>
            t.id === updatedTask.id ? updatedTask : t
          )
        );
      })
      .catch((error: unknown) => console.error("Error:", error));
  };

  const deleteTask = (id: string) => {
    fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => {
        setTasks(prev =>
          prev.filter(task => task.id !== id)
        );
      })
      .catch((error: unknown) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;



