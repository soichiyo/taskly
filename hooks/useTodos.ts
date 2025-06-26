import { useState } from "react";
import { Todo, CreateTodoInput, SubTodo, CreateSubTodoInput, Priority } from "../src/types/todo";

export const useTodos = () => {
    // 自分で状態を持っているため引数なし
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: "1",
            title: "Creating Todo-App",
            description: "delicious coffee",
            dueDate: "2025-12-01",
            priority: Priority.High,
            completed: false,
            createdAt: "2025-06-06T10:00:00Z",
            updatedAt: "2025-06-06T10:00:00Z",
            subTodos: [
                {
                    id: "1",
                    title: "Output Hello World!",
                    completed: false,
                    createdAt: "2025-06-06T10:00:00Z",
                    updatedAt: "2025-06-06T10:00:00Z",
                },
            ],
        },
        {
            id: "2",
            title: "Learn TypeScript",
            description: "Practice with React",
            dueDate: "2025-12-15",
            priority: Priority.Middle,
            completed: false,
            createdAt: "2025-06-06T11:00:00Z",
            updatedAt: "2025-06-06T11:00:00Z",
        },
    ]);


    //関数定義（CRUD操作）
    const addTodo = (todoData: CreateTodoInput) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            ...todoData,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setTodos((prev) => {
            return [...prev, newTodo];
        });
    };

    //関数定義（CRUD操作）
    const updateTodo = (id: string, updatedData: Partial<Todo>) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, ...updatedData, updatedAt: new Date().toISOString() }
                    : todo
            )
        );
    };

    //関数定義（CRUD操作）
    const handleDelete = (id: string) => {
        const confirm = window.confirm("このTodoを削除しますか？");
        if (confirm) {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        }
    };

    //関数定義（CRUD操作）
    const handleToggle = (id: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed,
                        updatedAt: new Date().toISOString(),
                    }
                    : todo
            )
        );
    };

    // addSubTodo関数
    const addSubTodo = (todoId: string, subTodoData: CreateSubTodoInput) => {
        const newSubTodo: SubTodo = {
            id: crypto.randomUUID(),
            ...subTodoData,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === todoId
                    ? {
                        ...todo,
                        subTodos: [...(todo.subTodos || []), newSubTodo]  // subTodosに新しいSubTodoを追加
                    }
                    : todo            // 他のTodoはそのまま
            )
        );
    };


    // updateSubTodo関数  
    const updateSubTodo = (todoId: string, subTodoId: string, updatedData: Partial<SubTodo>) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === todoId
                    ? { ...todo, subTodos: todo.subTodos?.map((subTodo) => subTodo.id === subTodoId ? { ...subTodo, ...updatedData, updatedAt: new Date().toISOString() } : subTodo) }
                    : todo
            )
        );
    };
    // deleteSubTodo関数
    const deleteSubTodo = (todoId: string, subTodoId: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === todoId ? { ...todo, subTodos: todo.subTodos?.filter((subTodo) => subTodo.id !== subTodoId) } : todo
            )
        );
    };
    // toggleSubTodo関数
    const toggleSubTodo = (todoId: string, subTodoId: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === todoId ? { ...todo, subTodos: todo.subTodos?.map((subTodo) => subTodo.id === subTodoId ? { ...subTodo, completed: !subTodo.completed } : subTodo) } : todo
            )
        );
    };

    return {
        todos,
        addTodo,
        updateTodo,
        handleDelete,
        handleToggle,
        addSubTodo,
        updateSubTodo,
        deleteSubTodo,
        toggleSubTodo,
    };
};
