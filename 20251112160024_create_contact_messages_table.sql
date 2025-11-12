/*
  # Contact Messages Table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `name` (text) - Name of the person contacting
      - `email` (text) - Email address for response
      - `subject` (text) - Subject of the message
      - `message` (text) - Message content
      - `phone` (text, nullable) - Optional phone number
      - `created_at` (timestamptz) - When the message was sent
  
  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for public insert access (allowing anyone to submit contact forms)
    - Add policy for service role to read messages (admin access)
  
  3. Notes
    - Simple contact form storage
    - Messages are publicly submittable
    - Useful for admin review
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to submit contact messages"
  ON contact_messages
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);