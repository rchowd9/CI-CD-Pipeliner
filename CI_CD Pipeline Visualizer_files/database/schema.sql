--  Repositories table
CREATE TABLE IF NOT EXISTS repositories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    last_run TIMESTAMP DEFAULT NOW(),
    url TEXT,
    avg_duration VARCHAR(50) DEFAULT '0m 0s',
    success_rate DECIMAL(5,2) DEFAULT 100.0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Pipeline runs table
CREATE TABLE IF NOT EXISTS pipeline_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID REFERENCES repositories(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    duration INTEGER DEFAULT 0,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Build metrics table
CREATE TABLE IF NOT EXISTS build_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    total_builds INTEGER DEFAULT 0,
    successful_builds INTEGER DEFAULT 0,
    failed_builds INTEGER DEFAULT 0,
    avg_duration INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(date)
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID REFERENCES repositories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    severity VARCHAR(20) DEFAULT 'medium',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO build_metrics (date, total_builds, successful_builds, failed_builds, avg_duration) VALUES
('2024-01-20', 45, 42, 3, 252),
('2024-01-21', 52, 50, 2, 228),
('2024-01-22', 38, 33, 5, 306),
('2024-01-23', 61, 60, 1, 210),
('2024-01-24', 47, 43, 4, 288),
('2024-01-25', 55, 53, 2, 234),
('2024-01-26', 42, 36, 6, 318)
ON CONFLICT (date) DO NOTHING;
 