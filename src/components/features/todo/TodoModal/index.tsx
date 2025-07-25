//features/todoの責任は「UIの表示とユーザーインタラクション」
//Todo詳細・編集UI（モーダルの見た目・フォーム制御・ローカル状態管理）

import { Todo, SubTodo } from "@/types/todo";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TodoEditForm } from "./TodoEditForm";
import { SubTodoAddForm } from "./SubTodoAddForm";
import { SubTodoList } from "./SubTodoList";

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
  onUpdateTodo: (id: string, updatedData: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
  onAddSubTodo: (todoId: string, subTodo: Omit<SubTodo, "id">) => void;
  onUpdateSubTodo: (
    todoId: string,
    subTodoId: string,
    updatedData: Partial<SubTodo>
  ) => void;
  onDeleteSubTodo: (todoId: string, subTodoId: string) => void;
  onToggleSubTodo: (todoId: string, subTodoId: string) => void;
  onToggle: (id: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const TodoModal = ({
  todo,
  onClose,
  onUpdateTodo,
  onDeleteTodo,
  onAddSubTodo,
  onDeleteSubTodo,
  onToggleSubTodo,
  onToggle,
  isEditing,
  setIsEditing,
}: TodoModalProps) => {
  const handleDeleteTodo = () => {
    if (window.confirm("本当にこのTodoを削除しますか？")) {
      onDeleteTodo(todo.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Todo詳細・編集" size="lg">
      <div className="space-y-6">
        {/* Todo情報セクション */}
        <div className="border-b pb-4">
          {isEditing ? (
            <TodoEditForm
              todo={todo}
              onUpdateTodo={onUpdateTodo}
              setIsEditing={setIsEditing}
            />
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo.id)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <h3
                  className={`flex-1 text-xl font-bold text-gray-900 ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </h3>
                <PriorityBadge priority={todo.priority} />
              </div>

              {todo.description && (
                <p className="text-gray-600 mb-3 leading-relaxed">
                  {todo.description}
                </p>
              )}

              {todo.dueDate && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  期限: {todo.dueDate}
                </div>
              )}
            </div>
          )}
        </div>

        {/* アクションボタン */}
        {!isEditing && (
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Button onClick={() => setIsEditing(true)} variant="edit">
                編集
              </Button>
              <Button onClick={handleDeleteTodo} variant="delete">
                削除
              </Button>
            </div>
          </div>
        )}

        {/* サブタスクセクション */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">サブタスク</h4>
          {/* サブタスク追加 */}
          <SubTodoAddForm onAddSubTodo={onAddSubTodo} todo={todo} />
          {/* サブタスク一覧 */}
          <SubTodoList
            todo={todo}
            onToggleSubTodo={onToggleSubTodo}
            onDeleteSubTodo={onDeleteSubTodo}
          />
        </div>
      </div>
    </Modal>
  );
};
