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
  className={`group flex justify-between items-start p-5 rounded-2xl transition-all duration-300 cursor-pointer
    ${
      task.completed
        ? "bg-white/5 text-slate-500"
        : "bg-white/10 hover:bg-white/20 text-white"
    }
  `}
>
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3">
      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold transition
          ${
            task.completed
              ? "bg-emerald-500 text-white"
              : "border border-slate-400 group-hover:border-indigo-400"
          }
        `}
      >
        {task.completed && "✓"}
      </div>

      <span
        className={`text-lg font-medium transition ${
          task.completed && "line-through opacity-60"
        }`}
      >
        {task.title}
      </span>
    </div>

    {task.description && (
      <span className="text-sm text-slate-400 ml-9">
        {task.description}
      </span>
    )}
  </div>

  <button
    onClick={(e) => {
      e.stopPropagation();
      onDelete(task.id);
    }}
    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition"
  >
    ✕
  </button>
</li>





  );
}


export default TaskItem;

