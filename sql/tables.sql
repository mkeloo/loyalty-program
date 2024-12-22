
-- Creating the users table for the admin
create table user_roles (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id),
    role text not null
);

insert into user_roles (user_id, role)
values ('e48dfbee-8685-4c19-9ecc-51c1592c3e4b', 'admin');



-- Rewards table
CREATE TABLE rewards (
    id SERIAL PRIMARY KEY, -- Unique identifier for each reward
    reward_name VARCHAR(40) NOT NULL, -- Name of the reward (capped at 40 characters)
    point_value INT NOT NULL, -- Points required to earn this reward
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the reward was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for last update
);

-- Trigger function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for rewards table
CREATE TRIGGER set_rewards_updated_at
BEFORE UPDATE ON rewards
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Members Tier table
CREATE TABLE member_tiers (
    id SERIAL PRIMARY KEY, -- Unique identifier for each member tier
    member_tier_name VARCHAR(50) NOT NULL, -- Name of the member tier (e.g., New, Regular, VIP)
    description TEXT NOT NULL, -- Description of the member tier
    value_type VARCHAR(10) NOT NULL CHECK (value_type IN ('days', 'points')), -- Type of condition ('days' or 'points')
    value INT NOT NULL, -- Numerical value for the condition (days or points)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the member tier was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for last update
);

-- Trigger for member_tiers table
CREATE TRIGGER set_member_tiers_updated_at
BEFORE UPDATE ON member_tiers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Inserting the rewards
INSERT INTO rewards (reward_name, point_value)
VALUES 
('5 Reward (no tobacco)', 100),
('10 Reward (no tobacco)', 200);

-- Inserting the member tiers
INSERT INTO member_tiers (member_tier_name, description, value_type, value)
VALUES 
('New', 'Members who visited for the first time in the past 30 days.', 'days', 30),
('Regular', 'Members who have visited in the past 30 days. Regulars become Inactive if they have not visited your business within this period.', 'days', 30),
('VIP', 'Regulars with at least 50 lifetime pts.', 'points', 50),
('VVIP', 'Regulars with at least 200 lifetime pts.', 'points', 200);