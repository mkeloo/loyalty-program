import { createClient } from "@/supabase/client";
import { Reward } from "@/lib/types";

const supabase = createClient();

/**
 * Fetch all rewards from the database.
 * @returns {Promise<Reward[]>} List of rewards.
 */
export const fetchRewards = async (): Promise<Reward[]> => {
    const { data, error } = await supabase
        .from("rewards")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching rewards:", error.message);
        throw new Error(error.message);
    }

    return data || [];
};

/**
 * Add a new reward to the database.
 * @param rewardName - Name of the reward.
 * @param pointValue - Point value for the reward.
 */
export const addReward = async (rewardName: string, pointValue: number): Promise<void> => {
    const { error } = await supabase.from("rewards").insert([
        {
            reward_name: rewardName,
            point_value: pointValue,
        },
    ]);

    if (error) {
        console.error("Error adding reward:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Update an existing reward in the database.
 * @param id - ID of the reward to update.
 * @param rewardName - Updated name of the reward.
 * @param pointValue - Updated point value.
 */
export const updateReward = async (id: number, rewardName: string, pointValue: number): Promise<void> => {
    const { error } = await supabase
        .from("rewards")
        .update({
            reward_name: rewardName,
            point_value: pointValue,
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating reward:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Delete a reward from the database.
 * @param id - ID of the reward to delete.
 */
export const deleteReward = async (id: number): Promise<void> => {
    const { error } = await supabase.from("rewards").delete().eq("id", id);

    if (error) {
        console.error("Error deleting reward:", error.message);
        throw new Error(error.message);
    }
};