//UIだけを担当するコンポーネント

import { FilterButton } from "@/components/FilterButton.tsx";
import { FilterType } from "@/types/todo";
import { Card } from "@/components/ui/Card.tsx";

interface FilterSectionProps {
    selectedFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    filterStats: {
        all: number;
        active: number;
        completed: number;
    };
}

export const FilterSection = ({
    selectedFilter,
    onFilterChange,
    filterStats,
}: FilterSectionProps) => {
    return (
        <Card>
            <h3>表示フィルター</h3>
            <div className="flex flex-wrap gap-2">
                <FilterButton
                    isSelected={selectedFilter === "all"}
                    onClick={() => onFilterChange("all")}
                    size="default"
                    disabled={false}
                    className=""
                >
                    すべて ({filterStats.all})
                </FilterButton>

                <FilterButton
                    isSelected={selectedFilter === "active"}
                    onClick={() => onFilterChange("active")}
                    size="default"
                    disabled={false}
                    className=""
                >
                    未完了 ({filterStats.active})
                </FilterButton>

                <FilterButton
                    isSelected={selectedFilter === "completed"}
                    onClick={() => onFilterChange("completed")}
                    size="default"
                    disabled={false}
                    className=""
                >
                    完了済み ({filterStats.completed})
                </FilterButton>
            </div>
        </Card>
    );
};
