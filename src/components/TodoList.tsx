import type { Todo, FilterType } from '../types';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  filter: FilterType;
  onFilter: (f: FilterType) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onClearCompleted: () => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

export function TodoList({ todos, filter, onFilter, onToggle, onDelete, onEdit, onClearCompleted }: Props) {
  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div>
      {/* 필터 탭 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {FILTERS.map((f) => (
            <button
              type="button"
              key={f.value}
              onClick={() => onFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="text-sm text-gray-400 dark:text-gray-500">
          남은 할 일 <span className="font-semibold text-violet-500">{activeCount}</span>개
        </span>
      </div>

      {/* 목록 */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-300 dark:text-gray-600">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm">
            {filter === 'completed' ? '완료된 항목이 없어요' : '할 일이 없어요! 추가해보세요'}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}

      {/* 완료 항목 정리 */}
      {completedCount > 0 && (
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={onClearCompleted}
            className="text-xs text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-colors"
          >
            완료된 항목 {completedCount}개 삭제
          </button>
        </div>
      )}
    </div>
  );
}
