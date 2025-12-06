import { ThemeToggle } from '../components/features/ThemeToggle';
import { Settings as SettingsIcon, Download, Bell, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { db } from '../lib/db';

export function SettingsPage() {
  // Note: Reusing logic from the previous Settings modal, but expanded
  const handleExport = async () => {
    const tasks = await db.tasks.toArray();
    const userData = await db.userData.toArray();
    const data = { tasks, userData, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `streakly-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto pt-8 px-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Appearance */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <SettingsIcon size={20} /> Appearance
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Theme</span>
            <ThemeToggle />
          </div>
        </section>

        {/* Data */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Shield size={20} /> Data & Privacy
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <div>
                 <div className="font-medium dark:text-gray-200">Export Data</div>
                 <div className="text-sm text-gray-500">Download a copy of your tasks and history</div>
               </div>
               <Button variant="outline" size="sm" onClick={handleExport}>
                 <Download size={16} className="mr-2" /> Export
               </Button>
            </div>
          </div>
        </section>

        {/* Notifications (Mock) */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 opacity-60">
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Bell size={20} /> Notifications (Coming Soon)
          </h2>
           <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Daily Reminders</span>
            <div className="h-6 w-11 bg-gray-200 rounded-full relative"><div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm"></div></div>
          </div>
        </section>
      </div>
    </div>
  );
}
