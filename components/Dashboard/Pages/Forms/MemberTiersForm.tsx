import React, { useState } from "react";
import { addMemberTier, updateMemberTier } from "@/supabase/api/memberTiersApi";
import { DialogTitle } from "@/components/ui/dialog";
import { SheetClose } from "@/components/ui/sheet";

interface MemberTiersFormProps {
    memberTier?: {
        id: number;
        member_tier_name: string;
        description: string;
        value: number;
        value_type: string;
    } | null; // Optional for editing
    onClose: () => void; // Callback to close the form
    onSave: () => void; // Callback to refetch member tiers
}

const MemberTiersForm: React.FC<MemberTiersFormProps> = ({ memberTier, onClose, onSave }) => {
    const [memberTierName, setMemberTierName] = useState(memberTier?.member_tier_name || "");
    const [description, setDescription] = useState(memberTier?.description || "");
    const [value, setValue] = useState(memberTier?.value || "");
    const [valueType, setValueType] = useState(memberTier?.value_type || "points");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (memberTier) {
            await updateMemberTier(
                memberTier.id,
                memberTierName,
                description,
                Number(value),
                valueType
            );
        } else {
            await addMemberTier(memberTierName, description, Number(value), valueType);
        }

        onSave();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <DialogTitle className="text-xl font-bold text-gray-100">
                {memberTier ? "Edit Member Tier" : "Add Member Tier"}
            </DialogTitle>

            {/* Tier Name */}
            <div>
                <label className="block text-sm font-medium text-gray-200">Tier Name</label>
                <input
                    type="text"
                    value={memberTierName}
                    onChange={(e) => setMemberTierName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-200">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Value */}
            <div>
                <label className="block text-sm font-medium text-gray-200">Value</label>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Value Type */}
            <div>
                <label className="block text-sm font-medium text-gray-200">Value Type</label>
                <select
                    value={valueType}
                    onChange={(e) => setValueType(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="points">Points</option>
                    <option value="days">Days</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
                <SheetClose asChild>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </SheetClose>
                <SheetClose asChild>
                    <button
                        type="submit"
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </SheetClose>
            </div>
        </form>
    );
};

export default MemberTiersForm;