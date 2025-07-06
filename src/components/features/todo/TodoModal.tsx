import { useState } from "react";
import { Todo, SubTodo } from "@/types/todo";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

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
}

export const TodoModal = ({
  todo,
  onClose,
  onUpdateTodo,
  onDeleteTodo,
  onAddSubTodo,
  onUpdateSubTodo,
  onDeleteSubTodo,
  onToggleSubTodo,
}: TodoModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSubTodoTitle, setNewSubTodoTitle] = useState("");
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || "",
    dueDate: todo.dueDate || "",
    priority: todo.priority,
  });

  const handleSaveTodo = () => {
    onUpdateTodo(todo.id, editData);
    setIsEditing(false);
  };

  const handleDeleteTodo = () => {
    if (window.confirm("本当にこのTodoを削除しますか？")) {
      onDeleteTodo(todo.id);
      onClose();
    }
  };

  const handleAddSubTodo = () => {
    if (newSubTodoTitle.trim()) {
      onAddSubTodo(todo.id, {
        title: newSubTodoTitle.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setNewSubTodoTitle("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSubTodo();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Todo詳細・編集" size="lg">
      <div className="space-y-6">
        {/* Todo情報セクション */}
        <div className="border-b pb-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="タイトルを入力"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="説明を入力"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  期限
                </label>
                <input
                  type="date"
                  value={editData.dueDate}
                  onChange={(e) =>
                    setEditData({ ...editData, dueDate: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  優先度
                </label>
                <select
                  value={editData.priority}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      priority: e.target.value as Todo["priority"],
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Middle">Middle</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveTodo} variant="default">
                  保存
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      title: todo.title,
                      description: todo.description || "",
                      dueDate: todo.dueDate || "",
                      priority: todo.priority,
                    });
                  }}
                  variant="outline"
                >
                  キャンセル
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {todo.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    todo.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : todo.priority === "Middle"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {todo.priority}
                </span>
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
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                編集
              </Button>
              <Button
                onClick={handleDeleteTodo}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                削除
              </Button>
            </div>
          </div>
        )}

        {/* サブタスクセクション */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">サブタスク</h4>

          {/* サブタスク追加 */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSubTodoTitle}
              onChange={(e) => setNewSubTodoTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="新しいサブタスクを追加"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button onClick={handleAddSubTodo} variant="default">
              追加
            </Button>
          </div>

          {/* サブタスク一覧 */}
          {todo.subTodos && todo.subTodos.length > 0 ? (
            <div className="space-y-2">
              {todo.subTodos.map((subTodo) => (
                <div
                  key={subTodo.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={subTodo.completed}
                    onChange={() => onToggleSubTodo(todo.id, subTodo.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span
                    className={`flex-1 ${
                      subTodo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {subTodo.title}
                  </span>
                  <Button
                    onClick={() => onDeleteSubTodo(todo.id, subTodo.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    削除
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              サブタスクはまだありません
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
