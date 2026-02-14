import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}
function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li
      onClick={() => onToggle(task)}
      style={{
        cursor: "pointer",
        textDecoration: task.completed ? "line-through" : "none"
      }}
    >
      <span
        onClick={() => onToggle(task)}
        style={{
          textDecoration: task.completed ? "line-through" : "none"
        }}
      >
        {task.title}
      </span>

      <button
  onClick={(e) => {
    e.stopPropagation();
    onDelete(task.id);
  }}
>
  ❌
</button>

    </li>
  );
}

export default TaskItem;

