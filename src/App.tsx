// App.tsx の責任
// ✅ Todo一覧の状態管理
// ✅ Todoの追加・削除・更新

import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { TodoForm } from "./components/TodoForm";
import { PageHeader } from "./components/PageHeader";
import type { Todo, CreateTodoInput, FilterType } from "./types/todo";
import { FilterButton } from "./components/FilterButton";
import { SortButton } from "./components/SortButton";

export default function App() {

  // 状態管理
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Creating Todo-App",
      description: "delicious coffee",
      dueDate: "2025-12-01",
      priority: "High",
      completed: false,
      createdAt: "2025-06-06T10:00:00Z",
      updatedAt: "2025-06-06T10:00:00Z",
    },
    {
      id: "2",
      title: "Learn TypeScript",
      description: "Practice with React",
      dueDate: "2025-12-15",
      priority: "Middle",
      completed: false,
      createdAt: "2025-06-06T11:00:00Z",
      updatedAt: "2025-06-06T11:00:00Z",
    },
  ]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | "priority" | "title">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ヘッダー */}
      <PageHeader title={"Todo App"} description={"TypeScript + React で作るTodoアプリ"} />

      {/* メインコンテンツ */}
      <main
        className="max-w-2xl mx-auto p-4"
      >
        <TodoForm onAddTodo={addTodo} />

        {/* フィルターボタン */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm"
        >
          <h3>
            表示フィルター
          </h3>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              isSelected={selectedFilter === "all"}
              onClick={() => setSelectedFilter("all")}
            >
              すべて ({todos.length})
            </FilterButton>

            <FilterButton
              isSelected={selectedFilter === "active"}
              onClick={() => setSelectedFilter("active")}
            >
              未完了 ({todos.filter((t) => !t.completed).length})
            </FilterButton>

            <FilterButton
              isSelected={selectedFilter === "completed"}
              onClick={() => setSelectedFilter("completed")}
            >
              完了済み ({todos.filter((t) => t.completed).length})
            </FilterButton>

          </div>
        </div>

        {/* 並び替えボタン */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm">
          <h3>
            並び替え
          </h3>

          <div className="flex flex-wrap gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="createdAt">作成日時</option>
              <option value="dueDate">期限</option>
              <option value="priority">優先度</option>
              <option value="title">タイトル</option>
            </select>

            <SortButton
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑ 昇順' : '↓ 降順'}
            </SortButton>
          </div>
        </div>

        {/* 検索ボタン */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm">
          <h3>
            検索
          </h3>
          <input
            type="text"
            placeholder="タイトルや説明を検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Todo一覧 */}
        <div
          className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
        >
          {sortedTodos.length === 0 ? (
            <div className="px-5 py-10 text-center text-gray-500"
            >
              <p className="text-lg mb-2">
                {selectedFilter === "all" && "まだTodoがありません"}
                {selectedFilter === "active" && "未完了のTodoがありません"}
                {selectedFilter === "completed" && "完了済みのTodoがありません"}
              </p>
              <p className="text-sm">
                新しいTodoを追加してみましょう！
              </p>
            </div>
          ) : (
            <ul
              className="list-none p-0 m-0"
            >
              {sortedTodos.map((item, index) => (
                <li
                  key={item.id}
                  className={`border-b border-gray-200 p-4 ${index < sortedTodos.length - 1 ? "border-b" : ""}`}
                >
                  <TodoItem
                    todo={item}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onUpdate={updateTodo}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
