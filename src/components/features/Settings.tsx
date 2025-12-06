import { useState } from "react";
import { Download, Settings as SettingsIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { db } from "../../lib/db";
import { motion, AnimatePresence } from "framer-motion";

export function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = async () => {
    const tasks = await db.tasks.toArray();
    const userData = await db.userData.toArray();
    
    const data = {
      tasks,
      userData,
      exportDate: new Date().toISOString(),
      app: "Streakly"
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `streakly-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <SettingsIcon size={20} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl z-50 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold dark:text-white">Settings</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2">
                  <X size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <Button onClick={handleExport} variant="outline" className="w-full justify-start gap-2">
                  <Download size={16} />
                  Export Data (JSON)
                </Button>
                
                <div className="text-xs text-gray-400 dark:text-gray-500 text-center pt-4">
                  Streakly v0.1 (Local Mode)
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
