import { Todo } from "../../../types/todo";
import { TodoDisplay } from "./TodoDisplay";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onOpenModal: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedData: Partial<Todo>) => void;
}

export const TodoItem = ({
  todo,
  onToggle,
  onOpenModal,
  onDelete,
  onUpdate,
}: TodoItemProps) => {
  return (
    <TodoDisplay
      todo={todo}
      onToggle={onToggle}
      onOpenModal={onOpenModal}
      onDelete={onDelete}
      onUpdate={onUpdate}
    />
  );
};
