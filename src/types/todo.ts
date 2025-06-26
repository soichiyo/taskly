// Todo アイテムの優先度
// ユニオン型
export type Priority = "High" | "Middle" | "Low";

// Todo アイテムの型定義
export interface Todo {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    priority: Priority;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    subTodos: SubTodo[];
}

export interface SubTodo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

// Todo作成時の型
export interface CreateTodoInput {
    title: string;
    description?: string;
    dueDate?: string;
    priority: Priority;
}

export interface CreateSubTodoInput {
    title: string;
}

// フィルターの種類
export type FilterType = "all" | "active" | "completed";
