import { useStore } from "../../lib/store";
import { Flame, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function StreakStats() {
  const user = useStore(state => state.user);

  if (!user) return null;

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 text-white shadow-lg shadow-orange-500/20"
      >
        <div className="flex items-center gap-2 opacity-90 mb-1 text-sm font-medium">
          <Flame size={18} fill="currentColor" />
          Current Streak
        </div>
        <div className="text-3xl font-bold">{user.currentStreak} <span className="text-lg font-normal opacity-80">days</span></div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-500/20"
      >
        <div className="flex items-center gap-2 opacity-90 mb-1 text-sm font-medium">
          <Trophy size={18} />
          Total Points
        </div>
        <div className="text-3xl font-bold">{user.points}</div>
      </motion.div>
    </div>
  );
}
