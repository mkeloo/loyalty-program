import React, { useState, useEffect } from "react";
import { Reward } from "@/lib/types";
import { fetchRewards, addReward, updateReward } from "@/supabase/api/rewardsApi";
import { DialogTitle } from "@/components/ui/dialog"; // Import DialogTitle for Sheet
import {

    SheetClose,
} from "@/components/ui/sheet";

interface RewardFormProps {
    reward?: Reward | null; // Optional for editing
    onClose: () => void; // Callback to close the sheet
    onSave: () => void; // Callback to trigger after saving
}

const RewardForm: React.FC<RewardFormProps> = ({ reward, onClose, onSave }) => {
    const [rewardName, setRewardName] = useState(reward?.reward_name || "");
    const [pointValue, setPointValue] = useState(reward?.point_value || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (reward) {
            await updateReward(reward.id, rewardName, Number(pointValue));
        } else {
            await addReward(rewardName, Number(pointValue));
        }

        onSave();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Add DialogTitle for Accessibility */}
            <DialogTitle className="text-xl font-bold">
                {reward ? "Edit Reward" : "Add Reward"}
            </DialogTitle>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                    Reward Name
                </label>
                <input
                    type="text"
                    value={rewardName}
                    onChange={(e) => setRewardName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                    Point Value
                </label>
                <input
                    type="number"
                    value={pointValue}
                    onChange={(e) => setPointValue(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
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
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default RewardForm;