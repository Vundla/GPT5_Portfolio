-- GPT5 Portfolio Database Initialization Script
-- Creates tables for Projects, Certifications, Contact Messages

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    github_link VARCHAR(500),
    demo_link VARCHAR(500),
    stack VARCHAR(500),
    screenshot_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    date_achieved DATE,
    verification_link VARCHAR(500),
    skill_tags VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

-- Insert sample data
INSERT INTO projects (title, description, github_link, demo_link, stack) VALUES
('AI Resume Builder', 'An intelligent resume builder that uses AI to optimize content and formatting for ATS systems.', 'https://github.com/vundla/ai-resume-builder', 'https://vundla.github.io/ai-resume-builder/', 'React, TypeScript, OpenAI, TailwindCSS'),
('GPT5 Portfolio', 'Enterprise-grade portfolio with AI analysis, PHP backend, and .NET API Gateway.', 'https://github.com/vundla/GPT5_Portfolio', NULL, 'Solid.js, .NET, FastAPI, PHP, PostgreSQL'),
('Data Pipeline Manager', 'Scalable data processing pipeline with real-time analytics dashboard.', 'https://github.com/vundla/data-pipeline', NULL, 'Python, Apache Kafka, Redis, Docker');

INSERT INTO certifications (title, provider, date_achieved, verification_link, skill_tags) VALUES
('Google Cloud Professional Developer', 'Google Cloud', '2024-06-15', 'https://google.com/verify', 'Cloud, Kubernetes, GCP, DevOps'),
('AWS Solutions Architect', 'Amazon Web Services', '2024-03-20', 'https://aws.amazon.com/verify', 'AWS, Architecture, Cloud Security'),
('Meta Front-End Developer', 'Meta / Coursera', '2023-12-01', 'https://coursera.org/verify', 'React, JavaScript, UI/UX, Testing');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_certifications_date ON certifications(date_achieved DESC);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);
