-- Public sticky notes on the Student Voice wall
CREATE TABLE notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  body TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  hidden INTEGER NOT NULL DEFAULT 0,
  -- salted hash of the sender's IP, only used for rate limiting (never the IP itself)
  sender TEXT NOT NULL
);
CREATE INDEX notes_visible ON notes (hidden, created_at DESC);
CREATE INDEX notes_sender ON notes (sender, created_at);

-- Private messages only Maria & Yayra can read (at /inbox)
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  read INTEGER NOT NULL DEFAULT 0,
  sender TEXT NOT NULL
);
CREATE INDEX messages_created ON messages (created_at DESC);
CREATE INDEX messages_sender ON messages (sender, created_at);
