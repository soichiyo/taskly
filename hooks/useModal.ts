//hooksの責任は「状態管理と副作用処理」
// モーダルの開閉状態管理のみ

import { useState } from "react";
import { Todo } from "../src/types/todo";

export const useModal = (todos: Todo[]) => {
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  const selectedTodo = selectedTodoId
    ? todos.find((todo) => todo.id === selectedTodoId)
    : null;

  const openModal = (todo: Todo) => setSelectedTodoId(todo.id);

  const closeModal = () => setSelectedTodoId(null);

  return {
    selectedTodo,
    openModal,
    closeModal,
  };
};
