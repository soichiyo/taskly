import { useState } from "react";
import { Todo } from "../../../../types/todo";
import { Button } from "../../../ui/Button";

interface TodoEditFormProps {
  todo: Todo;
  onUpdateTodo: (id: string, updatedData: Partial<Todo>) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export const TodoEditForm = ({
  todo,
  onUpdateTodo,
  setIsEditing,
}: TodoEditFormProps) => {
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

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          タイトル
        </label>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
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
  );
};
