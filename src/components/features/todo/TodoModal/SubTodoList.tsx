import { Todo } from "@/types/todo";
import { Button } from "@/components/ui/Button";

interface SubTodoListProps {
  todo: Todo;
  onToggleSubTodo: (todoId: string, subTodoId: string) => void;
  onDeleteSubTodo: (todoId: string, subTodoId: string) => void;
}

export const SubTodoList = ({
  todo,
  onToggleSubTodo,
  onDeleteSubTodo,
}: SubTodoListProps) => {
  return (
    <>
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
                variant="delete"
                size="sm"
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
    </>
  );
};
