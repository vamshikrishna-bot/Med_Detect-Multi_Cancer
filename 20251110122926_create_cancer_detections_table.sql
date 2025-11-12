/*
  # Cancer Detection System Schema

  1. New Tables
    - `cancer_detections`
      - `id` (uuid, primary key) - Unique identifier for each detection
      - `image_url` (text) - URL/path to the uploaded image
      - `detected_cancer_type` (text) - Type of cancer detected
      - `confidence_score` (decimal) - Confidence level of the detection (0-100)
      - `additional_info` (jsonb) - Additional metadata about the detection
      - `created_at` (timestamptz) - When the detection was performed
      - `user_id` (uuid, nullable) - Optional user tracking for future auth
  
  2. Security
    - Enable RLS on `cancer_detections` table
    - Add policy for public read access (medical data viewing)
    - Add policy for public insert access (allowing detection submissions)
  
  3. Notes
    - This table stores all cancer detection results
    - Confidence scores help users understand detection reliability
    - JSONB field allows flexible storage of additional detection metadata
*/

CREATE TABLE IF NOT EXISTS cancer_detections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  detected_cancer_type text NOT NULL,
  confidence_score decimal(5,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
  additional_info jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE cancer_detections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view cancer detections"
  ON cancer_detections
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public to create cancer detections"
  ON cancer_detections
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_cancer_detections_created_at ON cancer_detections(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cancer_detections_cancer_type ON cancer_detections(detected_cancer_type);