import { useState } from "react";
import { Todo } from "../src/types/todo";

export const useModal = (todos: Todo[]) => {

    const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

    const selectedTodo = selectedTodoId ? todos.find((todo) => todo.id === selectedTodoId) : null;

    const openModal = (todo: Todo) => setSelectedTodoId(todo.id);

    const closeModal = () => setSelectedTodoId(null);

    return {
        selectedTodo,
        openModal,
        closeModal,
    }
}
