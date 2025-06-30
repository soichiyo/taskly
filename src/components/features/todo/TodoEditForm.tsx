import { Button } from "../../Button.tsx";
import { Priority } from "../../../types/todo";

interface TodoEditData {
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
}

interface TodoEditFormProps {
    editData: TodoEditData;
    onEditChange: (field: keyof TodoEditData, value: string) => void;
    onEditCancel: () => void;
    onEditSave: () => void;
}

export const TodoEditForm = ({ editData, onEditCancel, onEditSave, onEditChange }: TodoEditFormProps) => {

    return (<div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    タイトル
                </label>
                <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => onEditChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    説明
                </label>
                <textarea
                    value={editData.description}
                    onChange={(e) => onEditChange("description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    期限
                </label>
                <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => onEditChange("dueDate", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    優先度
                </label>
                <select
                    value={editData.priority}
                    onChange={(e) => onEditChange("priority", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="Low">低</option>
                    <option value="Middle">中</option>
                    <option value="High">高</option>
                </select>
            </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
            <Button
                onClick={onEditCancel}
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
                キャンセル
            </Button>
            <Button
                onClick={onEditSave}
                className="bg-blue-600 hover:bg-blue-700"
            >
                保存
            </Button>
        </div>
    </div>
    );
};
