//features/todoの責任は「UIの表示とユーザーインタラクション」
//Todo一覧UI

import type { Todo, FilterType } from "../../../types/todo";
import { Card } from "../../ui/Card.tsx";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  selectedFilter: FilterType;
  onToggle: (id: string) => void;
  // onDelete: (id: string) => void;
  // onUpdate: (id: string, updatedData: Partial<Todo>) => void;
  onOpenModal: (todo: Todo) => void;
  todoModal: React.ReactNode;
}

export const TodoList = ({
  todos,
  selectedFilter,
  onToggle,
  onOpenModal,
  todoModal,
}: TodoListProps) => {
  return (
    <Card padding="sm">
      {todos.length === 0 ? (
        <div className="px-5 py-10 text-center text-gray-500">
          <p className="text-lg mb-2">
            {selectedFilter === "all" && "まだTodoがありません"}
            {selectedFilter === "active" && "未完了のTodoがありません"}
            {selectedFilter === "completed" && "完了済みのTodoがありません"}
          </p>
          <p className="text-sm">新しいTodoを追加してみましょう！</p>
        </div>
      ) : (
        <ul className="list-none p-0 m-0">
          {todos.map((item, index) => (
            <li
              key={item.id}
              className={`border-b border-gray-200 p-4 ${
                index < todos.length - 1 ? "border-b" : ""
              }`}
            >
              <TodoItem
                todo={item}
                onToggle={onToggle}
                onOpenModal={onOpenModal}
              />
            </li>
          ))}
        </ul>
      )}
      {todoModal}
    </Card>
  );
};
