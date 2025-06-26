import { useState } from "react";
import { Todo } from "../src/types/todo";

export const useModal = () => {
    // openModal関数
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const openModal = (todo: Todo) => setSelectedTodo(todo);
    // closeModal関数
    const closeModal = () => setSelectedTodo(null);

    return {
        selectedTodo,
        openModal,
        closeModal,
    }
}
