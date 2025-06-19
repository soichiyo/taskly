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
import type { Todo, Priority } from "../types/todo";
import { Button } from "@/components/ui/button";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedData: Partial<Todo>) => void;
};

export const TodoItem = (props: TodoItemProps) => {
    const { todo, onToggle, onDelete, onUpdate } = props;
    /*
  分割導入という使い方↑、結果（以下の変数が作られる）
  const todo = props.todo;
  const onToggle = props.onToggle;  
  const onDelete = props.onDelete;
  */

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        onUpdate(todo.id, editData);
        setIsEditing(false);
    };

    const [editData, setEditData] = useState({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
    });

    // タイトル用
    const handleEditTitleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditData((prev) => ({ ...prev, title: event.target.value }));
    };

    //詳細説明用
    const handleEditDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setEditData((prev) => ({ ...prev, description: event.target.value }));
    };

    //期限用
    const handleEditDueDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditData((prev) => ({ ...prev, dueDate: event.target.value }));
    };

    //優先度用
    const handleEditPriorityChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setEditData((prev) => ({
            ...prev,
            priority: event.target.value as Priority,
        }));
    };

    return (
        <div>
            {isEditing ? (
                <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                タイトル
                            </label>
                            <input
                                type="text"
                                value={editData.title}
                                onChange={handleEditTitleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                説明
                            </label>
                            <textarea
                                value={editData.description}
                                onChange={handleEditDescriptionChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                期限
                            </label>
                            <input
                                type="date"
                                value={editData.dueDate}
                                onChange={handleEditDueDateChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                優先度
                            </label>
                            <select
                                value={editData.priority}
                                onChange={handleEditPriorityChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Middle">Middle</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="text-gray-700 border-gray-300 hover:bg-gray-50"
                        >
                            キャンセル
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            保存
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-lg text-gray-800">
                                    {todo.title}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${todo.priority === "High"
                                    ? "bg-red-50 text-red-600"
                                    : todo.priority === "Middle"
                                        ? "bg-yellow-50 text-yellow-600"
                                        : "bg-green-50 text-green-600"
                                    }`}>
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

                    <div className="flex justify-end gap-2 mt-3">
                        <Button
                            onClick={handleEditClick}
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                            編集
                        </Button>
                        <Button
                            onClick={() => onDelete(todo.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                            削除
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
