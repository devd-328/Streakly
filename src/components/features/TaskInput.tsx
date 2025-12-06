import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { parseTaskInput } from '../../lib/nlp';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Sparkles } from 'lucide-react';

export function TaskInput() {
  const [input, setInput] = useState('');
  const addTask = useStore(state => state.addTask);
  const [parsedPreview, setParsedPreview] = useState<{title: string, recurrence?: string, priority: number, tags: string[]} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.length > 3) {
      const parsed = parseTaskInput(val);
      setParsedPreview(parsed);
    } else {
      setParsedPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const { title, recurrence, priority, tags } = parseTaskInput(input);
    await addTask(title, recurrence, priority, tags);
    setInput('');
    setParsedPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-8">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={handleChange}
            placeholder="Add a task (e.g. 'Gym daily at 7am')"
            className="pr-12 h-12 text-lg shadow-sm"
            autoFocus
          />
          <div className="absolute right-3 top-3 text-gray-400">
            <Sparkles size={20} className={input.length > 0 ? "text-primary-400" : ""} />
          </div>
        </div>
        <Button type="submit" size="lg" className="h-12 px-6">
          <Plus size={20} />
        </Button>
      </div>
      
      {parsedPreview && (
        <div className="absolute -bottom-6 left-1 text-xs flex items-center gap-3">
          {parsedPreview.recurrence && (
            <span className="text-primary-600">Repeats: <strong>{parsedPreview.recurrence}</strong></span>
          )}
          {parsedPreview.priority === 2 && (
             <span className="text-red-500 font-semibold">High Priority</span>
          )}
          {parsedPreview.tags.length > 0 && (
            <div className="flex gap-1">
              {parsedPreview.tags.map(tag => (
                <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-md font-medium">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
