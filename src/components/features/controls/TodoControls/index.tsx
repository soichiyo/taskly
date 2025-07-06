//features/controls/ の責任は「操作パネルのUI」
//メインコンポーネント（複数の子を統合）

import { FilterSection } from "./FilterSection";
import { SortSection } from "./SortSection";
import { SearchSection } from "./SearchSection";
import { FilterType } from "../../../../types/todo";

interface TodoControlsProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  filterStats: {
    all: number;
    active: number;
    completed: number;
  };
  sortBy: "createdAt" | "dueDate" | "title" | "priority";
  sortOrder: "asc" | "desc";
  onSortByChange: (
    sortBy: "createdAt" | "dueDate" | "title" | "priority"
  ) => void;
  onSortOrderChange: (order: "asc" | "desc") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TodoControls = ({
  selectedFilter,
  onFilterChange,
  filterStats,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
  searchQuery,
  onSearchChange,
}: TodoControlsProps) => {
  return (
    <div className="space-y-4">
      <FilterSection
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
        filterStats={filterStats}
      />

      <SortSection
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={onSortByChange}
        onSortOrderChange={onSortOrderChange}
      />

      <SearchSection
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};
