"use client";

import React, { useState, useEffect } from "react";
import { fetchMemberTiers, deleteMemberTier } from "@/supabase/api/memberTiersApi";
import MemberTiersForm from "./Forms/MemberTiersForm";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";

// Define the MemberTier type (should match your API response structure)
interface MemberTier {
    id: number;
    member_tier_name: string;
    description: string;
    value: number;
    value_type: string;
}

const MemberTiersPage: React.FC = () => {
    const [memberTiers, setMemberTiers] = useState<MemberTier[]>([]);
    const [selectedTier, setSelectedTier] = useState<MemberTier | null>(null);
    const [tierToDelete, setTierToDelete] = useState<MemberTier | null>(null); // For delete confirmation

    // Fetch member tiers from the database
    const getMemberTiers = async () => {
        try {
            const tiers = await fetchMemberTiers();
            setMemberTiers(tiers);
        } catch (error) {
            console.error("Error fetching member tiers:", error);
        }
    };

    // Delete a member tier
    const handleDelete = async () => {
        if (!tierToDelete) return;
        try {
            await deleteMemberTier(tierToDelete.id);
            setTierToDelete(null); // Reset tierToDelete
            getMemberTiers(); // Refresh the list after deleting
        } catch (error) {
            console.error("Error deleting member tier:", error);
        }
    };

    useEffect(() => {
        getMemberTiers();
    }, []);

    return (
        <div className="p-6">

            <div className="w-full flex items-center justify-center">
                <h1 className="text-4xl">Member Tiers</h1>
            </div>

            {/* Add Member Tier Button */}
            <div className="flex justify-end items-end my-6">
                <Sheet>
                    <SheetTrigger>
                        <a
                            onClick={() => setSelectedTier(null)} // Reset selected tier for adding a new one
                            className="mb-4 px-4 py-3 bg-blue-600 text-white rounded"
                        >
                            Add Member Tier
                        </a>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetDescription className="sr-only">
                            Use this form to add a new member tier.
                        </SheetDescription>
                        <MemberTiersForm
                            memberTier={selectedTier}
                            onClose={() => setSelectedTier(null)}
                            onSave={getMemberTiers}
                        />
                    </SheetContent>
                </Sheet>
            </div>


            {/* Member Tiers Table */}
            <table className="w-full overflow-hidden">
                <thead>
                    <tr className="bg-blue-950 text-gray-100">
                        <th className="border border-gray-600 p-2">Tier Name</th>
                        <th className="border border-gray-600 p-2">Description</th>
                        <th className="border border-gray-600 p-2">Value</th>
                        <th className="border border-gray-600 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {memberTiers.map((tier, index) => (
                        <tr
                            key={tier.id}
                            className={`text-center border border-gray-700 text-gray-200 ${index % 2 === 0 ? "bg-neutral-900/80" : "bg-gray-800"
                                }`}
                        >
                            <td className="border border-gray-600 p-2 w-[20%]">{tier.member_tier_name}</td>
                            <td className="border border-gray-600 p-2 w-[50%]">{tier.description}</td>
                            <td className="border border-gray-600 p-2 w-[10%]">
                                {tier.value} {tier.value_type}
                            </td>
                            <td className="border border-gray-600 p-2 space-x-2">
                                {/* Edit Button */}
                                <Sheet>
                                    <SheetTrigger>
                                        <div
                                            onClick={() => setSelectedTier(tier)} // Set selected tier for editing
                                            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition shadow-md w-full sm:w-auto"
                                        >
                                            Edit
                                        </div>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetDescription className="sr-only">
                                            Use this form to edit an existing member tier.
                                        </SheetDescription>
                                        <MemberTiersForm
                                            memberTier={selectedTier}
                                            onClose={() => setSelectedTier(null)}
                                            onSave={getMemberTiers}
                                        />
                                    </SheetContent>
                                </Sheet>

                                {/* Delete Button */}
                                <Dialog>
                                    <DialogTrigger>
                                        <div
                                            onClick={() => setTierToDelete(tier)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition shadow-md w-full sm:w-auto"
                                        >
                                            Delete
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle className="text-xl font-bold">Confirm Delete</DialogTitle>
                                        <DialogHeader>
                                            <DialogDescription>
                                                Are you sure you want to delete the tier{" "}
                                                <strong>{tierToDelete?.member_tier_name}</strong>? This action cannot
                                                be undone.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="flex justify-end gap-2">
                                            <DialogClose asChild>
                                                <button
                                                    onClick={() => setTierToDelete(null)}
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberTiersPage;