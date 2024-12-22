// types.ts

// Type for the Rewards table
export interface Reward {
    id: number; // Unique identifier for each reward
    reward_name: string; // Name of the reward (capped at 40 characters)
    point_value: number; // Points required to earn this reward
    created_at: string; // Timestamp when the reward was created
    updated_at: string; // Timestamp for the last update
}

// Type for the Members Tier table
export interface MemberTier {
    id: number; // Unique identifier for each member tier
    member_tier_name: string; // Name of the member tier (e.g., New, Regular, VIP)
    description: string; // Description of the member tier
    value_type: "days" | "points"; // Type of condition ('days' or 'points')
    value: number; // Numerical value for the condition (days or points)
    created_at: string; // Timestamp when the member tier was created
    updated_at: string; // Timestamp for the last update
}