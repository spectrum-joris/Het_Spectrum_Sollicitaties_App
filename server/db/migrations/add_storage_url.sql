-- Add storage_url column to attachments table for storing full URLs (Vercel Blob or local)
ALTER TABLE attachments ADD COLUMN storage_url TEXT;
