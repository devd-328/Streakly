import * as chrono from 'chrono-node';

export function parseTaskInput(input: string): { title: string, recurrence?: string, date?: Date, priority: number, tags: string[] } {
  const parsed = chrono.parse(input);
  
  let date = new Date();
  let text = input;

  if (parsed.length > 0) {
    const result = parsed[0];
    date = result.start.date();
    text = input.replace(result.text, '').trim();
  }
  
  // Recurrence detection
  let recurrence = undefined;
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('every day') || lowerInput.includes('daily')) recurrence = 'daily';
  if (lowerInput.includes('every week') || lowerInput.includes('weekly')) recurrence = 'weekly';

  // Priority detection (Heuristic)
  let priority = 1; // Normal
  if (lowerInput.includes('urgent') || lowerInput.includes('asap') || lowerInput.includes('!')) priority = 2;
  if (lowerInput.includes('low priority') || lowerInput.includes('later')) priority = 0;
  
  // Tag detection
  const tags: string[] = [];
  const words = text.split(' ');
  text = words.filter(word => {
    if (word.startsWith('#') && word.length > 1) {
      tags.push(word.slice(1).toLowerCase()); // Remove # and save
      return false; // Remove from title
    }
    return true;
  }).join(' ');

  return {
    title: text || input, 
    recurrence,
    date,
    priority,
    tags
  };
}
