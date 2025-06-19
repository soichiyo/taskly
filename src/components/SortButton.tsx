import { Button } from "./ui/button";

type SortButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

export const SortButton = ({ onClick, children }: SortButtonProps) => {
    return (
        <Button
            variant="outline"  // またはお好みのvariant
            size="sm"         // またはお好みのsize
            onClick={onClick}
        >
            {children}
        </Button>
    );
};