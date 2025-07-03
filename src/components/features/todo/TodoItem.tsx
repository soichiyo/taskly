// 既に存在するTodoを表示する
// 親から「このTodoを表示して」とデータを渡される
// データを受け取って表示するだけ
// TodoItem の責任
// ✅ 1つのTodoデータの表示
// ✅ ユーザーアクション（クリック等）の検出
// ✅ 親への操作要求の送信
// ✅ 表示状態の切り替え（完了/未完了）
// ✅ 条件付きレンダリング（期限、説明の有無）

import { useState } from "react";
import { Todo } from "../../../types/todo";
import { TodoEditForm } from "./TodoEditForm";
import { TodoDisplay } from "./TodoDisplay";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedData: Partial<Todo>) => void;
  onOpenModal: (todo: Todo) => void;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onOpenModal,
}: TodoItemProps) => {
  /*
  分割導入という使い方↑、結果（以下の変数が作られる）
  const todo = props.todo;
  const onToggle = props.onToggle;  
  const onDelete = props.onDelete;
  */

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || "",
    dueDate: todo.dueDate || "",
    priority: todo.priority,
  });

  const handleEditStart = () => {
    console.log("Editing Start"); // デバッグログ

    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditSave = () => {
    onUpdate(todo.id, editData);
    setIsEditing(false);
  };

  const handleEditChange = (
    field: keyof typeof editData, // ← 実在するフィールド名のみ受け入れる
    value: string
  ) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      {isEditing ? (
        <TodoEditForm
          editData={editData}
          onEditChange={handleEditChange}
          onEditCancel={handleEditCancel}
          onEditSave={handleEditSave}
        />
      ) : (
        <TodoDisplay
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={handleEditStart}
          onOpenModal={onOpenModal}
        />
      )}
    </div>
  );
};
