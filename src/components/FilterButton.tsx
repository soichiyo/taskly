import { Button, type ButtonProps } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FilterButtonProps = {
    isSelected: boolean;
    onClick: () => void;
    children: React.ReactNode;
} & Pick<ButtonProps, 'size' | 'disabled' | 'className'>;

export const FilterButton = ({
    isSelected,
    onClick,
    children,
    className,
    size = "default",
    ...props
}: FilterButtonProps) => {
    return (
        <Button
            variant={isSelected ? "default" : "outline"}
            size={size}
            onClick={onClick}
            className={cn(
                "font-bold", // フォントの太さを保持
                isSelected && "bg-blue-600 hover:bg-blue-700", // 特定の色が必要な場合
                className
            )}
            {...props}
        >
            {children}
        </Button>
    );
};