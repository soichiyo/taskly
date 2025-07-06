//features/todoの責任は「UIの表示とユーザーインタラクション」
//Todo1件の表示・編集UI

import { Todo } from "../../../types/todo";
import { TodoDisplay } from "./TodoDisplay";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onOpenModal: (todo: Todo) => void;
  // onDelete: (id: string) => void;
  //onUpdate: (id: string, updatedData: Partial<Todo>) => void;
}

export const TodoItem = ({ todo, onToggle, onOpenModal }: TodoItemProps) => {
  return (
    <TodoDisplay todo={todo} onToggle={onToggle} onOpenModal={onOpenModal} />
  );
};
