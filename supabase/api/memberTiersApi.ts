import { createClient } from "@/supabase/client";
import { MemberTier } from "@/lib/types";

const supabase = createClient();

/**
 * Fetch all member tiers from the database.
 * @returns {Promise<MemberTier[]>} List of member tiers.
 */
export const fetchMemberTiers = async (): Promise<MemberTier[]> => {
    const { data, error } = await supabase
        .from("member_tiers")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching member tiers:", error.message);
        throw new Error(error.message);
    }

    return data || [];
};

/**
 * Add a new member tier to the database.
 * @param memberTierName - Name of the tier.
 * @param description - Description of the tier.
 * @param value - Value for the tier (e.g., 30, 50).
 * @param valueType - Type of the value (e.g., "days", "points").
 */
export const addMemberTier = async (
    memberTierName: string,
    description: string,
    value: number,
    valueType: string
): Promise<void> => {
    const { error } = await supabase.from("member_tiers").insert([
        {
            member_tier_name: memberTierName,
            description,
            value,
            value_type: valueType,
        },
    ]);

    if (error) {
        console.error("Error adding member tier:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Update an existing member tier in the database.
 * @param id - ID of the member tier to update.
 * @param memberTierName - Updated name of the tier.
 * @param description - Updated description.
 * @param value - Updated value.
 * @param valueType - Updated value type.
 */
export const updateMemberTier = async (
    id: number,
    memberTierName: string,
    description: string,
    value: number,
    valueType: string
): Promise<void> => {
    const { error } = await supabase
        .from("member_tiers")
        .update({
            member_tier_name: memberTierName,
            description,
            value,
            value_type: valueType,
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating member tier:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Delete a member tier from the database.
 * @param id - ID of the member tier to delete.
 */
export const deleteMemberTier = async (id: number): Promise<void> => {
    const { error } = await supabase.from("member_tiers").delete().eq("id", id);

    if (error) {
        console.error("Error deleting member tier:", error.message);
        throw new Error(error.message);
    }
};