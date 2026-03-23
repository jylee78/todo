import type { Todo, TodoAction } from './types';

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [
        {
          id: crypto.randomUUID(),
          text: action.payload.text,
          completed: false,
          priority: action.payload.priority,
          createdAt: Date.now(),
        },
        ...state,
      ];

    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );

    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload);

    case 'EDIT':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );

    case 'CLEAR_COMPLETED':
      return state.filter((todo) => !todo.completed);

    case 'SET':
      return action.payload;

    default:
      return state;
  }
}
