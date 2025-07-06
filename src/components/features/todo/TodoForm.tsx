//features/todoの責任は「UIの表示とユーザーインタラクション」
//Todo作成フォームUI

import { useState } from "react";
import { CreateTodoInput, Priority } from "@/types/todo";
import { Button } from "@/components/ui/Button";

interface TodoFormProps {
  onAddTodo: (todoData: CreateTodoInput) => void;
  /*
CreateTodoInput = データの形を定義
TodoFormProps = コンポーネントに必要な機能を定義

別々に必要な理由:
役割が違う
一つは「データの形」、もう一つは「コンポーネントの機能」
*/
}

export const TodoForm = (props: TodoFormProps) => {
  // フォームの状態管理
  const [formData, setFormData] = useState<CreateTodoInput>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  // フィールドのエラー管理
  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // バリデーション
  const validateField = (fieldName: keyof CreateTodoInput, value: string) => {
    let error = "";

    switch (fieldName) {
      case "title":
        if (value.trim() === "") {
          error = "タイトルを入力してください";
        } else if (value.length > 100) {
          error = "タイトルは100文字以内で入力してください";
        }
        break;

      case "description":
        if (value.length > 500) {
          error = "詳細説明は500文字以内で入力してください";
        }
        break;

      case "dueDate":
        if (value) {
          const today = new Date().toISOString().split("T")[0];
          if (value < today) {
            error = "期限は今日以降の日付を設定してください";
          }
        }
        break;
    }

    return error;
  };

  // フォーム送信時に親の関数を呼び出す
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 全フィールドのバリデーションを実行
    const titleError = validateField("title", formData.title);
    const descriptionError = validateField(
      "description",
      formData.description || ""
    );
    const dueDateError = validateField("dueDate", formData.dueDate || "");

    // 個別エラーを更新
    setFieldErrors({
      title: titleError,
      description: descriptionError,
      dueDate: dueDateError,
    });

    // エラーがあるかチェック
    const hasErrors = titleError || descriptionError || dueDateError;

    if (hasErrors) {
      return; // エラーがあれば送信しない
    }

    // バリデーション成功時の処理
    props.onAddTodo(formData);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
    });

    // エラーをクリア
    setFieldErrors({
      title: "",
      description: "",
      dueDate: "",
    });
  };

  const handleFieldChange = (field: keyof CreateTodoInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    const error = validateField(field, value);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm"
    >
      <h2>新しいTodoを追加</h2>

      <div className="mb-4">
        <label className="block mb-1 font-bold text-gray-700">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          placeholder="やることを入力してください"
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        />
        {/* タイトルのエラーメッセージを表示 */}
        {fieldErrors.title && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-bold text-gray-700">詳細説明</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          placeholder="詳細な説明（任意）"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md text-sm resize-y"
        />
        {/* 詳細説明のエラーメッセージを表示 */}
        {fieldErrors.description && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-bold text-gray-700">期限</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleFieldChange("dueDate", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
          {/* 期限のエラーメッセージを表示 */}
          {fieldErrors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.dueDate}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-bold text-gray-700">優先度</label>
          <select
            value={formData.priority}
            onChange={(e) => handleFieldChange("priority", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value={Priority.Low}>{Priority.Low}</option>
            <option value={Priority.Middle}>{Priority.Middle}</option>
            <option value={Priority.High}>{Priority.High}</option>
          </select>
        </div>
      </div>

      <Button type="submit" variant="submit">
        追加
      </Button>
    </form>
  );
};
