import { useEffect } from 'react';
import { useStore } from '../lib/store';
import { TaskInput } from '../components/features/TaskInput';
import { TaskCard } from '../components/features/TaskCard';
import { StreakStats } from '../components/features/StreakStats';
import { CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Dashboard() {
  const { tasks, init, initialized, isLoading } = useStore();

  useEffect(() => {
    init();
  }, [init]);

  if (!initialized || isLoading) {
    return <div className="flex h-screen items-center justify-center text-gray-400">Loading...</div>;
  }

  const activeTasks = tasks
    .filter(t => !t.completed)
    .sort((a, b) => {
      if ((b.priority || 1) !== (a.priority || 1)) {
        return (b.priority || 1) - (a.priority || 1);
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  const completedTasks = tasks.filter(t => t.completed).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="max-w-md mx-auto pt-8 px-4 pb-24">
      <header className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Good Morning!</h1>
          <p className="text-gray-500 dark:text-gray-400">Keep your streak alive today.</p>
        </div>
      </header>

      <StreakStats />
      
      <TaskInput />

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 ml-1">To Do</h2>
          <AnimatePresence initial={false} mode="popLayout">
            {activeTasks.length === 0 && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                 className="text-center py-8 text-gray-400 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-800"
               >
                 No active tasks. Enjoy your day!
               </motion.div>
            )}
            {activeTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </div>

        {completedTasks.length > 0 && (
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 ml-1 mt-8">
              <CheckCircle2 size={16} />
              Completed
            </h2>
            <AnimatePresence initial={false}>
              {completedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
