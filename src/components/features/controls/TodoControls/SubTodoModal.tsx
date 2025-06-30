import type { Todo, SubTodo, CreateSubTodoInput } from '@/types/todo';
import { Button } from '@/components/ui/Button.tsx';
import { useState } from 'react';

interface SubTodoModalProps {
    todo: Todo;
    onClose: () => void;
    onAddSubTodo: (todoId: string, subTodoData: CreateSubTodoInput) => void;
    onUpdateSubTodo: (todoId: string, subTodoId: string, updatedData: Partial<SubTodo>) => void;
    onDeleteSubTodo: (todoId: string, subTodoId: string) => void;
    onToggleSubTodo: (todoId: string, subTodoId: string) => void;
}

export const SubTodoModal = ({
    todo,
    onClose,
    onAddSubTodo,
    onToggleSubTodo
}: SubTodoModalProps) => {

    const [newSubTodoTitle, setNewSubTodoTitle] = useState<string>("");

    const addTodo = () => {
        console.log("Adding SubTodo:", newSubTodoTitle); // デバッグログ
        if (newSubTodoTitle.trim()) {
            onAddSubTodo(todo.id, { title: newSubTodoTitle });
            setNewSubTodoTitle("");
        }
    };

    return (
        // オーバーレイ（背景）
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose} // 背景クリックで閉じる
        >
            {/* モーダル本体 */}
            <div
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()} // モーダル内クリックで閉じるのを防ぐ
            >
                {/* ヘッダー */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2>
                        {todo.title}
                    </h2>
                    <Button
                        onClick={onClose}
                    >
                        ✕
                    </Button>
                </div>

                {/* コンテンツエリア */}
                <div className="p-6">
                    <p className="text-gray-600 mb-4">{todo.description}</p>

                    {/* サブタスク追加フォーム */}
                    <div className="mb-6">
                        <h3>サブタスク</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="サブタスクを追加..."
                                onChange={(e) => setNewSubTodoTitle(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button
                                type="submit"
                                className="text-white bg-blue-600 hover:bg-blue-700"
                                onClick={addTodo}
                            >
                                追加
                            </Button>
                        </div>
                    </div>

                    {/* サブタスク一覧 */}
                    <div className="space-y-2">
                        {todo.subTodos.map((subTodo) => (
                            <div key={subTodo.id} className="flex items-center gap-2 p-2 border rounded">
                                <input
                                    type="checkbox"
                                    checked={subTodo.completed}
                                    onChange={() => onToggleSubTodo(todo.id, subTodo.id)}
                                    className="h-4 w-4"
                                />
                                <span className={subTodo.completed ? "line-through text-gray-500" : ""}>
                                    {subTodo.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
