import { Button } from "@/components/ui/Button";

type SortButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const SortButton = ({ onClick, children }: SortButtonProps) => {
  return (
    <Button variant="outline" onClick={onClick}>
      {children}
    </Button>
  );
};
