import { SubTodo, Todo } from "@/types/todo";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface SubTodoAddFormProps {
  onAddSubTodo: (todoId: string, subTodo: Omit<SubTodo, "id">) => void;
  todo: Todo;
}

export const SubTodoAddForm = ({ onAddSubTodo, todo }: SubTodoAddFormProps) => {
  const [newSubTodoTitle, setNewSubTodoTitle] = useState("");

  const handleAddSubTodo = () => {
    if (newSubTodoTitle.trim()) {
      onAddSubTodo(todo.id, {
        title: newSubTodoTitle.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setNewSubTodoTitle("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSubTodo();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={newSubTodoTitle}
        onChange={(e) => setNewSubTodoTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="新しいサブタスクを追加"
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <Button onClick={handleAddSubTodo} variant="default">
        追加
      </Button>
    </div>
  );
};
