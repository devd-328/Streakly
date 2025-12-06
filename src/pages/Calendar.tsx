import { useState, useEffect } from 'react';
import { useStore } from '../lib/store';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

export function CalendarPage() {
  const { tasks, init, initialized } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!initialized) init();
  }, [init, initialized]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => isSameDay(task.dueDate, date));
  };

  return (
    <div className="max-w-4xl mx-auto pt-8 px-4 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft size={20} />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
        {/* Header */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 dark:bg-gray-900 p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}

        {/* Days */}
        {calendarDays.map((day) => {
          const dayTasks = getTasksForDay(day);
          const completedCount = dayTasks.filter(t => t.completed).length;
          const isToday = isSameDay(day, new Date());

          return (
            <div 
              key={day.toISOString()} 
              className={cn(
                "bg-white dark:bg-gray-950 min-h-[100px] p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900",
                !isSameMonth(day, monthStart) && "bg-gray-50/50 dark:bg-gray-900/50 text-gray-400"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={cn(
                  "text-sm w-6 h-6 flex items-center justify-center rounded-full",
                  isToday && "bg-primary-600 text-white font-bold"
                )}>
                  {format(day, 'd')}
                </span>
                {completedCount > 0 && completedCount === dayTasks.length && dayTasks.length > 0 && (
                  <CheckCircle2 size={14} className="text-green-500" />
                )}
              </div>

              <div className="space-y-1">
                {dayTasks.slice(0, 3).map(task => (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded truncate border",
                      task.completed 
                        ? "bg-gray-100 dark:bg-gray-900 text-gray-500 decoration-slate-400 line-through border-transparent" 
                        : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800"
                    )}
                  >
                    {task.title}
                  </motion.div>
                ))}
                {dayTasks.length > 3 && (
                   <div className="text-[10px] text-gray-400 pl-1">+{dayTasks.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
