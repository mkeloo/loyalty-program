"use client";

import React, { useEffect, useState } from "react";
import { fetchRewards, deleteReward } from "@/supabase/api/rewardsApi";
import { Reward } from "@/lib/types";
import { Sheet, SheetContent, SheetTrigger, SheetDescription, } from "@/components/ui/sheet";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import RewardForm from "@/components/Dashboard/Pages/Forms/RewardForm";

const RewardsPage = () => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null); // For editing rewards
    const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null); // For delete confirmation


    // Fetch rewards from the backend
    const getRewards = async () => {
        setIsLoading(true); // Set loading to true while fetching
        try {
            const rewardsData = await fetchRewards();
            setRewards(rewardsData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!rewardToDelete) return;
        try {
            await deleteReward(rewardToDelete.id);
            setRewardToDelete(null); // Reset the reward to delete
            getRewards(); // Refresh the rewards list
        } catch (err) {
            console.error("Error deleting reward:", err);
        }
    };


    useEffect(() => {
        getRewards();
    }, []);

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-screen-lg mx-auto">
            <div className="w-full flex items-center justify-center">
                <h1 className="text-4xl">Rewards Management</h1>
            </div>
            {/* Header with Add Button */}
            <div className="flex justify-between items-center my-6">
                {/* Point Earning System */}
                <div className="mb-4 text-gray-200 text-sm flex items-center">
                    <span>
                        <strong>Members earn 1 point for every</strong> $1 spent.
                    </span>
                    <button className="text-blue-500 underline ml-2 hover:text-blue-700">
                        Edit point value
                    </button>
                    <span className="ml-2 text-gray-500">*</span>
                </div>

                {/* Add Reward Button */}
                <Sheet>
                    <SheetTrigger>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            Add Reward
                        </div>
                    </SheetTrigger>
                    <SheetContent>
                        {/* Add a visually-hidden description */}
                        <SheetDescription className="sr-only">
                            Use this form to add a new reward.
                        </SheetDescription>
                        <RewardForm
                            onClose={() => setSelectedReward(null)}
                            onSave={() => {
                                setSelectedReward(null); // Reset selected reward
                                getRewards(); // Refetch rewards after saving
                            }}
                        />
                    </SheetContent>
                </Sheet>
            </div>



            {/* Rewards Table */}
            <table className="w-full overflow-hidden">
                <thead>
                    <tr className="bg-blue-950 text-gray-100">
                        <th className="border border-gray-600 p-2">Reward Name</th>
                        <th className="border border-gray-600 p-2">Point Value</th>
                        <th className="border border-gray-600 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rewards.map((reward, index) => (
                        <tr
                            key={reward.id}
                            className={`text-center border border-gray-700 text-gray-200 ${index % 2 === 0 ? "bg-neutral-900/80" : "bg-gray-800"}`}
                        >
                            <td className="border border-gray-600 p-2">{reward.reward_name}</td>
                            <td className="border border-gray-600 p-2">{reward.point_value}</td>
                            <td className="border border-gray-600 p-2 space-x-2">
                                {/* Edit Button */}
                                <Sheet>
                                    <SheetTrigger>
                                        <div
                                            onClick={() => setSelectedReward(reward)}
                                            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
                                        >
                                            Edit
                                        </div>
                                    </SheetTrigger>
                                    <SheetContent>
                                        {/* Add a visually-hidden description */}
                                        <SheetDescription className="sr-only">
                                            Use this form to edit an existing reward.
                                        </SheetDescription>
                                        <RewardForm
                                            reward={selectedReward} // Pass the selected reward for editing
                                            onClose={() => setSelectedReward(null)}
                                            onSave={() => {
                                                setSelectedReward(null);
                                                getRewards(); // Refetch rewards after saving
                                            }}
                                        />
                                    </SheetContent>
                                    {/* Delete Button */}
                                    <Dialog>
                                        <DialogTrigger>
                                            <div
                                                onClick={() => setRewardToDelete(reward)}
                                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Confirm Delete</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete the reward{" "}
                                                    <strong>{rewardToDelete?.reward_name}</strong>? This action cannot be
                                                    undone.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <button
                                                        onClick={() => setRewardToDelete(null)}
                                                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <button
                                                        onClick={handleDelete}
                                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </DialogClose>

                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </Sheet>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RewardsPage;