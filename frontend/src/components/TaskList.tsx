import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const pendingCount = tasks.filter(task => !task.completed).length;
  return (
    <ul>
      <>
  <h2>Pendientes ({pendingCount})</h2>
  {tasks
    .filter(task => !task.completed)
    .map(task => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}

  <h2 style={{ marginTop: "25px" }}>Completadas</h2>
  {tasks
    .filter(task => task.completed)
    .map(task => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
</>
    </ul>
  );
}

export default TaskList;


