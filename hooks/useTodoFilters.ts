import { useState } from "react";
import type { FilterType, Todo } from "../src/types/todo";

export const useTodoFilters = (todos: Todo[]) => {
    // 外部からデータを受け取って処理するため引数あり
    // フィルター・ソート・検索の状態
    const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
    const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | "priority" | "title">("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // データ加工（フィルタリング）
    const filteredTodos = todos.filter((todo) => {
        switch (selectedFilter) {
            case "active":
                return !todo.completed;
            case "completed":
                return todo.completed;
            default:
                return true;
        }
    });

    // データ加工（検索）
    const searchedTodos = filteredTodos.filter((todo) => {
        const query = searchQuery.toLowerCase();
        return todo.title.toLowerCase().includes(query) || todo.description?.toLowerCase().includes(query);
    });

    // データ加工（ソート）
    const sortTodos = (todos: Todo[]) => {
        return [...todos].sort((a, b) => {
            //todos.sort(...) だと、元のtodos配列が変更されてしまうので、[...todos]でコピーを作成する
            let aValue: any;
            let bValue: any;

            switch (sortBy) {
                case 'createdAt':
                    aValue = new Date(a.createdAt);
                    bValue = new Date(b.createdAt);
                    break;
                case 'dueDate':
                    // 期限がない場合は最後にする
                    aValue = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
                    bValue = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
                    break;
                case 'priority':
                    // High=3, Middle=2, Low=1 として比較
                    const priorityOrder = { High: 3, Middle: 2, Low: 1 };
                    aValue = priorityOrder[a.priority];
                    bValue = priorityOrder[b.priority];
                    break;
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                default:
                    return 0;
            }

            // 比較処理
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const sortedTodos = sortTodos(searchedTodos);

    const filterStats = () => {
        return {
            all: todos.length,
            active: todos.filter((t) => !t.completed).length,
            completed: todos.filter((t) => t.completed).length,
        }
    }

    return {
        // 処理済みデータの命名変更
        filteredAndSortedTodos: sortedTodos,
        filterStats,

        // 状態
        selectedFilter,
        sortBy,
        sortOrder,
        searchQuery,

        // 状態更新関数
        setSelectedFilter,
        setSortBy,
        setSortOrder,
        setSearchQuery,
    };
};