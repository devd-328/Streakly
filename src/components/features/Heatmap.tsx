import { useEffect, useState } from 'react';
import { db } from '../../lib/db';
import type { ActivityLog } from '../../lib/db';
import { eachDayOfInterval, subDays, format, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function Heatmap() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    db.activityLog.toArray().then(setLogs);
  }, []);

  // Generate last 90 days
  const today = new Date();
  const days = eachDayOfInterval({
    start: subDays(today, 89), // 90 days total
    end: today
  });

  const getIntensity = (date: Date) => {
    const count = logs.filter(l => 
      isSameDay(new Date(l.date), date) && l.action === 'completed'
    ).length;

    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    return 3;
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Activity Log</h3>
      
      <div className="flex flex-wrap gap-1 justify-center">
        {days.map(day => {
          const intensity = getIntensity(day);
          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.005 * days.indexOf(day) }}
              title={`${format(day, 'MMM d')}: ${intensity > 0 ? 'Active' : 'No activity'}`}
              className={cn(
                "w-3 h-3 rounded-sm",
                intensity === 0 && "bg-gray-100 dark:bg-gray-800",
                intensity === 1 && "bg-green-200 dark:bg-green-900/40",
                intensity === 2 && "bg-green-400 dark:bg-green-700",
                intensity === 3 && "bg-green-600 dark:bg-green-500"
              )}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
        <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900/40" />
        <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
        <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
        <span>More</span>
      </div>
    </div>
  );
}
