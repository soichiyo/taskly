// App.tsx の責任
// ✅ Todo一覧の状態管理
// ✅ Todoの追加・削除・更新
// ✅ サブタスクの追加・削除・更新
import { TodoForm } from "./components/features/todo/TodoForm";
import { PageHeader } from "./components/PageHeader";
import { SubTodoModal } from "./components/features/controls/TodoControls/SubTodoModal";
import { useTodos, useTodoFilters, useModal } from "../hooks";
import { TodoControls } from "./components/features/controls/TodoControls";
import { TodoList } from "./components/features/todo/TodoList";

export default function App() {

  // 状態管理
  const { todos, addTodo, updateTodo, handleDelete, handleToggle, addSubTodo, updateSubTodo, deleteSubTodo, toggleSubTodo } = useTodos();
  const { selectedFilter, setSelectedFilter, sortBy, setSortBy, sortOrder, setSortOrder, searchQuery, setSearchQuery, filteredAndSortedTodos, filterStats } = useTodoFilters(todos);
  const { selectedTodo, openModal, closeModal } = useModal(todos);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ヘッダー（PageHeaderコンポーネント） */}
      <PageHeader title={"Taskly"} description={"TypeScript + React で作るタスク管理アプリ"} />

      {/* メインコンテンツ */}
      <main className="max-w-2xl mx-auto p-4">

        {/* フォーム（TodoFormコンポーネント） */}
        <TodoForm onAddTodo={addTodo} />

        {/* フィルター・ソート・検索コントロール（TodoControlsコンポーネント） */}
        <TodoControls
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          filterStats={filterStats()}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Todo一覧（TodoListコンポーネント） */}
        <TodoList
          todos={filteredAndSortedTodos}
          selectedFilter={selectedFilter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={updateTodo}
          onOpenModal={openModal}
        />

        {/* サブタスクモーダル（SubTodoModalコンポーネント） */}
        {selectedTodo && (   // ← selectedTodoがnullじゃなければモーダル表示 
          <SubTodoModal
            todo={selectedTodo}
            onClose={closeModal}
            onAddSubTodo={addSubTodo}
            onUpdateSubTodo={updateSubTodo}
            onDeleteSubTodo={deleteSubTodo}
            onToggleSubTodo={toggleSubTodo}
          />
        )}
      </main>
    </div >
  );
}
