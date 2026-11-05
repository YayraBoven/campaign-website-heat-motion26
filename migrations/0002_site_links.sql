-- Links Maria & Yayra can change from /inbox without a redeploy
-- (WhatsApp, TikTok profile, TikTok "Watch now" video)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
