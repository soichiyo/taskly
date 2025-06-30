import { Todo } from "../../../types/todo";
import { Button } from "../../ui/button.tsx";

interface TodoDisplayProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: () => void;
    onOpenModal: (todo: Todo) => void;
}

export const TodoDisplay = ({ todo, onToggle, onDelete, onEdit, onOpenModal }: TodoDisplayProps) => {
    return (<div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span
                        className="font-bold text-lg text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => onOpenModal(todo)}
                    >
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
                onClick={onEdit}
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
    </div>);
};
