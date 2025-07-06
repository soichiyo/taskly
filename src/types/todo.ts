// Todo アイテムの優先度
export const Priority = {
  Low: "Low",
  Middle: "Middle",
  High: "High",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

// ソート順の種類
export const sortBy = {
  CreatedAt: "createdAt",
  DueDate: "dueDate",
  Title: "title",
  Priority: "priority",
} as const;
export type SortBy = (typeof sortBy)[keyof typeof sortBy];

// ソート順
export const SortOrder = {
  Asc: "asc",
  Desc: "desc",
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

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
  // subTodos? だと null の場合を考慮する必要が出てくるので、必須項目にしてデフォルトを空配列にした方が考慮事項が少なくて楽ちん
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
  Completed: "completed",
} as const;

export type FilterType = (typeof FilterType)[keyof typeof FilterType];
