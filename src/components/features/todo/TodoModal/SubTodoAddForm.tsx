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
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />
      <Button onClick={handleAddSubTodo} variant="submit">
        追加
      </Button>
    </div>
  );
};
