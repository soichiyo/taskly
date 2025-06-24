//UIだけを担当するコンポーネント
import { Card } from "../../../ui/Card";
import { SortButton } from "../../../SortButton";

interface SortSectionProps {
    sortBy: "createdAt" | "dueDate" | "title" | "priority";
    sortOrder: "asc" | "desc";
    onSortByChange: (sortBy: "createdAt" | "dueDate" | "title" | "priority") => void;
    onSortOrderChange: (order: "asc" | "desc") => void;
}

export const SortSection = ({
    sortBy,
    sortOrder,
    onSortByChange,
    onSortOrderChange,
}: SortSectionProps) => {
    return (
        <Card>
            <h3>
                並び替え
            </h3>

            <div className="flex flex-wrap gap-2">
                <select
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value as any)}
                    className="p-2 border border-gray-300 rounded-md text-sm"
                >
                    <option value="createdAt">作成日時</option>
                    <option value="dueDate">期限</option>
                    <option value="title">タイトル</option>
                </select>

                <SortButton
                    onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                    {sortOrder === 'asc' ? '↑ 昇順' : '↓ 降順'}
                </SortButton>
            </div>
        </Card>
    )
}