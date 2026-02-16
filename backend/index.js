const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

let tasks = [
  { id: "1", title: "Hacer challenge ForIT", completed: false }
];


app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  const newTask = {
    id: Date.now().toString(), 
    title,
    description: description || "",
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});



app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = Boolean(completed); 

  res.json(task);
});






app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.json({
    message: "Tarea eliminada correctamente",
    task: deletedTask[0]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
