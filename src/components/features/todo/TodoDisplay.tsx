//features/todoの責任は「UIの表示とユーザーインタラクション」
//Todo1件の表示UI

import { Todo } from "../../../types/todo";

interface TodoDisplayProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onOpenModal: (todo: Todo) => void;
  // onDelete: (id: string) => void;
  // onUpdate: (id: string, updatedData: Partial<Todo>) => void;
}

export const TodoDisplay = ({
  todo,
  onToggle,
  onOpenModal,
}: TodoDisplayProps) => {
  return (
    <div
      className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onOpenModal(todo)}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            e.stopPropagation(); // クリックイベントのバブリングを防ぐ
            onToggle(todo.id);
          }}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-lg text-gray-800">
              {todo.title}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                todo.priority === "High"
                  ? "bg-red-50 text-red-600"
                  : todo.priority === "Middle"
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {todo.priority}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-sm text-gray-500 mb-2">
            <span className="px-1.5 py-0.5 bg-gray-50 rounded">
              ID: {todo.id}
            </span>
            {todo.description && (
              <span className="px-1.5 py-0.5 bg-gray-50 rounded italic">
                説明: {todo.description}
              </span>
            )}
            {todo.dueDate && (
              <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 rounded">
                期限: {todo.dueDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* サブタスクの数を表示（オプション） */}
      {todo.subTodos && todo.subTodos.length > 0 && (
        <div className="mt-2 text-sm text-gray-500">
          サブタスク: {todo.subTodos.filter((sub) => sub.completed).length}/
          {todo.subTodos.length}
        </div>
      )}
    </div>
  );
};
