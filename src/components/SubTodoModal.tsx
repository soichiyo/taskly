import type { Todo, SubTodo, CreateSubTodoInput } from '../types/todo';

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
    onUpdateSubTodo,
    onDeleteSubTodo,
    onToggleSubTodo
}: SubTodoModalProps) => {
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
                    <h2 className="text-xl font-bold text-gray-900">
                        {todo.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* コンテンツエリア */}
                <div className="p-6">
                    <p className="text-gray-600 mb-4">{todo.description}</p>

                    {/* とりあえずサブタスク数を表示 */}
                    <div className="text-sm text-gray-500">
                        サブタスク: {todo.subTodos?.length || 0}件
                    </div>
                </div>
            </div>
        </div>
    );
};