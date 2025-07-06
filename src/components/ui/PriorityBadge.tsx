import { Priority } from "@/types/todo";

interface PriorityBadgeProps {
  priority: Priority;
  size?: "sm" | "md" | "lg";
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = "sm",
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const colorClasses = {
    [Priority.High]: "bg-red-50 text-red-600",
    [Priority.Middle]: "bg-yellow-50 text-yellow-600",
    [Priority.Low]: "bg-green-50 text-green-600",
  };

  return (
    <span
      className={`rounded-full ${sizeClasses[size]} ${colorClasses[priority]}`}
    >
      {priority}
    </span>
  );
};
