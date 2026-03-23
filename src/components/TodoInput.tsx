import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'high', label: '높음', color: 'text-red-500' },
  { value: 'medium', label: '중간', color: 'text-yellow-500' },
  { value: 'low', label: '낮음', color: 'text-blue-400' },
];

export function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority);
    setText('');
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="flex gap-2 mb-6">
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        aria-label="우선순위 선택"
        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        {PRIORITY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        placeholder="할 일을 입력하세요..."
        className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:text-gray-100"
      />

      <button
        type="button"
        onClick={handleAdd}
        className="rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white px-5 py-3 text-sm font-medium transition-colors"
      >
        추가
      </button>
    </div>
  );
}
