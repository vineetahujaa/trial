PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  created_at_ms INTEGER NOT NULL,
  last_seen_at_ms INTEGER
);

CREATE TABLE IF NOT EXISTS batches (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  batch_number TEXT NOT NULL,
  source TEXT,
  battery_type TEXT,
  form_factor TEXT,
  intake_weight_kg REAL,
  intake_date TEXT,
  status TEXT DEFAULT 'registered',
  notes TEXT,
  created_at_ms INTEGER NOT NULL,
  updated_at_ms INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_batches_user_batch_number ON batches(user_id, batch_number);
CREATE INDEX IF NOT EXISTS idx_batches_user_created ON batches(user_id, created_at_ms DESC);

CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  batch_id TEXT,
  object_key TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  content_type TEXT,
  size_bytes INTEGER,
  created_at_ms INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_files_batch_created ON files(batch_id, created_at_ms DESC);
CREATE INDEX IF NOT EXISTS idx_files_user_created ON files(user_id, created_at_ms DESC);

CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  batch_id TEXT,
  issue_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  equipment TEXT,
  recommended_action TEXT,
  notes TEXT,
  raw_text TEXT,
  structured_json TEXT,
  created_at_ms INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_incidents_user_created ON incidents(user_id, created_at_ms DESC);
CREATE INDEX IF NOT EXISTS idx_incidents_batch_created ON incidents(batch_id, created_at_ms DESC);

CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at_ms INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chat_user_convo_time ON chat_messages(user_id, conversation_id, created_at_ms DESC);
