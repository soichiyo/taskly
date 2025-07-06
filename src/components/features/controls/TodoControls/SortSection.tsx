//features/controls/ の責任は「操作パネルのUI」
//UIだけを担当するコンポーネント

import { Card } from "../../../ui/Card.tsx";
import { SortButton } from "../../../SortButton.tsx";
import { SortBy, SortOrder } from "../../../../types/todo.ts";

interface SortSectionProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortByChange: (sortBy: SortBy) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

export const SortSection = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortSectionProps) => {
  return (
    <Card>
      <h3>並び替え</h3>

      <div className="flex flex-wrap gap-2">
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as SortBy)}
          className="p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="createdAt">作成日時</option>
          <option value="dueDate">期限</option>
          <option value="title">タイトル</option>
        </select>

        <SortButton
          onClick={() =>
            onSortOrderChange(
              sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc
            )
          }
        >
          {sortOrder === SortOrder.Asc ? "↑ 昇順" : "↓ 降順"}
        </SortButton>
      </div>
    </Card>
  );
};
