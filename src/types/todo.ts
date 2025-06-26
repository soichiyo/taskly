// Todo アイテムの優先度
export const Priority = {
    High: 'High',
    Middle: 'Middle',
    Low: 'Low'
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

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
    subTodos?: SubTodo[];
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
export const FilterType = {
    All: "all",
    Active: "active",
    Completed: "completed"
} as const;

export type FilterType = (typeof FilterType)[keyof typeof FilterType];
