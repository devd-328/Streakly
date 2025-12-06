import { useState } from 'react';
import { useStore } from '../lib/store';
import { StreakStats } from '../components/features/StreakStats';
import { Medal, Edit2, Save, X } from 'lucide-react';
import { Heatmap } from '../components/features/Heatmap';
import { formatDate } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function ProfilePage() {
  const { user, updateProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  if (!user) return null;

  const startEditing = () => {
    setEditForm({ name: user.name || '', email: user.email || '' });
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateProfile(editForm.name, editForm.email);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto pt-8 px-4 pb-24">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg relative group">
          {user.name ? user.name.charAt(0).toUpperCase() : 'ME'}
          {!isEditing && (
            <button 
              onClick={startEditing}
              className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className="max-w-xs mx-auto space-y-3 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg mb-6">
            <Input 
              value={editForm.name} 
              onChange={e => setEditForm({...editForm, name: e.target.value})}
              placeholder="Your Name" 
            />
            <Input 
              value={editForm.email} 
              onChange={e => setEditForm({...editForm, email: e.target.value})}
              placeholder="Email" 
            />
            <div className="flex gap-2 pt-2">
               <Button size="sm" className="flex-1" onClick={handleSave}>
                 <Save size={14} className="mr-1" /> Save
               </Button>
               <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                 <X size={14} />
               </Button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name || 'Anonymous User'}
            </h1>
            <p className="text-gray-500">{user.email || 'No email set'}</p>
          </>
        )}
        
        <p className="text-xs text-gray-400 mt-2">Joined {formatDate(new Date())}</p>
      </div>

      <StreakStats />

      <div className="mb-8">
        <Heatmap />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
          <Medal size={20} /> Achievements
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           {/* Mock Badges */}
           <div className="aspect-square bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center p-4 text-center grayscale hover:grayscale-0 transition-all cursor-pointer hover:border-primary-200 hover:shadow-md">
              <div className="text-4xl mb-2">🚀</div>
              <div className="font-medium text-sm dark:text-white">Early Bird</div>
              <div className="text-xs text-gray-400 mt-1">Complete 5 tasks before 9am</div>
           </div>
           <div className="aspect-square bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center p-4 text-center transition-all cursor-pointer border-primary-500 bg-primary-50 dark:bg-primary-900/10">
              <div className="text-4xl mb-2">🔥</div>
              <div className="font-medium text-sm dark:text-white">Streak Master</div>
              <div className="text-xs text-gray-400 mt-1">Reach a 7-day streak</div>
           </div>
           <div className="aspect-square bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center p-4 text-center grayscale">
              <div className="text-4xl mb-2">📅</div>
              <div className="font-medium text-sm dark:text-white">Consistent</div>
              <div className="text-xs text-gray-400 mt-1">Active for 30 days</div>
           </div>
        </div>
      </div>
    </div>
  );
}
