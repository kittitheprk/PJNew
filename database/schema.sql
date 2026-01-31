-- Protocol for Player Statistics Table
-- Based on 'PROLOGUE: THE WEIGHT OF STONE'

CREATE TABLE player_stats (
    user_id VARCHAR(50) PRIMARY KEY, -- Unique Identifier for the player
    
    -- Core Stats (Initialized to 0 or 5 as per design)
    stance INTEGER DEFAULT 0,    -- ความกล้าชน / ยืนหยัด
    drive INTEGER DEFAULT 0,     -- แรงขับเคลื่อน / การเริ่มก่อน
    intellect INTEGER DEFAULT 0, -- การวิเคราะห์ / เหตุผล
    knowledge INTEGER DEFAULT 0, -- ความสนใจ Lore / ข้อมูล
    empathy INTEGER DEFAULT 0,   -- ความเข้าใจคน / ประนีประนอม
    resilience INTEGER DEFAULT 0,-- ความอดทน / ความนิ่ง

    -- Sorting Result
    assigned_dorm VARCHAR(50),   -- AKRON, DESMOS, SKIA, ANTOCHI
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index for sorting/leaderboards if needed
CREATE INDEX idx_dorm ON player_stats(assigned_dorm);
