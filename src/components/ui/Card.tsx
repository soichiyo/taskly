import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: "none" | "sm" | "md" | "lg";
    margin?: "none" | "sm" | "md" | "lg";
    shadow?: "none" | "sm" | "md" | "lg";
    rounded?: "none" | "sm" | "md" | "lg";
}

export const Card = ({
    children,
    className = "",
    padding = "md",
    margin = "md",
    shadow = "sm",
    rounded = "lg",
}: CardProps) => {
    // パディングのバリエーション
    const paddingClasses = {
        none: "",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
    };

    // マージンのバリエーション
    const marginClasses = {
        none: "",
        sm: "mb-2",
        md: "mb-4",
        lg: "mb-6",
    };

    // シャドウのバリエーション
    const shadowClasses = {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
    };

    // 角丸のバリエーション
    const roundedClasses = {
        none: "",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
    };

    const baseClasses = "bg-white border border-gray-200";
    const combinedClasses = [
        baseClasses,
        paddingClasses[padding],
        marginClasses[margin],
        shadowClasses[shadow],
        roundedClasses[rounded],
        className, // カスタムクラスを最後に追加
    ]
        .filter(Boolean) // 空文字列を除去
        .join(" ");

    return <div className={combinedClasses}>{children}</div>;
};