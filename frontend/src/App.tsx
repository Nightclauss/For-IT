import { useEffect, useState } from "react";
import type { Task } from "./types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const API_URL: string = import.meta.env.VITE_API_URL;

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
      .then(() => {
        setTasks(prev =>
          prev.filter(task => task.id !== id)
        );
      })
      .catch((error: unknown) => console.error("Error:", error));
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
    
    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)] p-10">
      
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          TAREAS
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          ForIT
        </p>
      </div>

      <TaskForm onAddTask={addTask} />

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  </div>
);
}

export default App;



