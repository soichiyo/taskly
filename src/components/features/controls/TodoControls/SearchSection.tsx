//UIだけを担当するコンポーネント

import { Card } from "../../../ui/Card.tsx";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchSection = ({
  searchQuery,
  onSearchChange,
}: SearchSectionProps) => {
  return (
    <Card>
      <h3>検索</h3>
      <input
        type="text"
        placeholder="タイトルや説明を検索"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />
    </Card>
  );
};
