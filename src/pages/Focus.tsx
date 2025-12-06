import { useState, useEffect } from 'react';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function FocusPage() {
  const { tasks, toggleTask } = useStore();
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  const activeTask = tasks.find(t => t.id === activeTaskId);
  const uncompletedTasks = tasks.filter(t => !t.completed);

  useEffect(() => {
    let interval: any;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Play sound or notify (Simulated)
      if (mode === 'work') {
         setMode('break');
         setTimeLeft(5 * 60);
      } else {
         setMode('work');
         setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleComplete = async () => {
    if (activeTaskId) {
        await toggleTask(activeTaskId, true);
        setActiveTaskId(null);
        resetTimer();
    }
  };

  return (
    <div className="max-w-xl mx-auto pt-8 px-4 pb-24 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Focus Mode</h1>

      {/* Timer Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-gray-200 dark:stroke-gray-800 fill-none"
            strokeWidth="8"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            className={cn(
                "fill-none",
                mode === 'work' ? "stroke-primary-500" : "stroke-green-500"
            )}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 120}
            initial={{ strokeDashoffset: 0 }}
            animate={{ 
                strokeDashoffset: ((mode === 'work' ? 25 * 60 : 5 * 60) - timeLeft) / (mode === 'work' ? 25 * 60 : 5 * 60) * (2 * Math.PI * 120) 
            }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-5xl font-bold tabular-nums dark:text-white tracking-tighter">
            {formatTime(timeLeft)}
          </div>
          <div className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest text-sm mt-2">
            {mode === 'work' ? 'Focus' : 'Break'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-12">
        <Button size="lg" className="w-32" onClick={toggleTimer}>
          {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button size="icon" variant="outline" onClick={resetTimer}>
          <RotateCcw size={20} />
        </Button>
      </div>

      {/* Task Selector */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Current Task</h2>
        
        {activeTask ? (
            <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className="font-medium dark:text-white">{activeTask.title}</span>
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setActiveTaskId(null)}>Change</Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleComplete}>
                        <CheckCircle2 size={16} className="mr-1" /> Done
                    </Button>
                </div>
            </div>
        ) : (
            <div className="space-y-2">
                {uncompletedTasks.length > 0 ? (
                    uncompletedTasks.map(task => (
                        <button
                            key={task.id}
                            onClick={() => setActiveTaskId(task.id!)}
                            className="w-full text-left p-3 rounded-lg hover:bg-white dark:hover:bg-gray-950 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-800 text-gray-700 dark:text-gray-300"
                        >
                            {task.title}
                        </button>
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-4">No active tasks</div>
                )}
            </div>
        )}
      </div>
    </div>
  );
}
