import { Check, Trash2, Repeat, Calendar, Flag } from "lucide-react";
import { useStore } from "../../lib/store";
import type { Task } from "../../lib/db";
import { cn, formatDate } from "../../lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const toggleTask = useStore((state) => state.toggleTask);
  const deleteTask = useStore((state) => state.deleteTask);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "group flex items-center justify-between p-4 mb-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md",
        task.completed && "opacity-60 bg-gray-50 dark:bg-gray-950"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => toggleTask(task.id!, !task.completed)}
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors",
            task.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-primary-500"
          )}
        >
          {task.completed && <Check size={14} strokeWidth={3} />}
        </button>
        
        <div>
          <h3 className={cn(
            "font-medium text-gray-900 dark:text-gray-100",
            task.completed && "line-through text-gray-500"
          )}>
            {task.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            {task.priority === 2 && (
              <span className="flex items-center gap-1 text-red-500 font-medium">
                <Flag size={12} fill="currentColor" />
                High
              </span>
            )}
            {task.tags && task.tags.length > 0 && task.tags.map(tag => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 rounded text-[10px] border border-gray-200 dark:border-gray-700">
                #{tag}
              </span>
            ))}
            {task.recurrence && (
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Repeat size={12} />
                {task.recurrence}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>

      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => task.id && deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
      >
        <Trash2 size={16} />
      </Button>
    </motion.div>
  );
}
