-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS scan_history;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- Create scan history table
CREATE TABLE IF NOT EXISTS scan_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    scan_type VARCHAR(50) CHECK (scan_type IN ('email_breach', 'ad_analysis', 'permission_scan')),
    target TEXT,
    result_data JSONB,
    risk_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_scan_user_id ON scan_history(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_created_at ON scan_history(created_at);

-- Create demo user (password: demo123 - will be hashed)
-- Run this separately or use the registration form