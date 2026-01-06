import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const screentimeTable = sqliteTable(
  "screentime",
  {
    id: int().notNull(),
    sessionId: text("session_id").notNull(),
    status: text({ enum: ["question", "answer"] }).notNull(),
    start: int().notNull(),
    duration: int().notNull(),
  },
  (table) => [primaryKey({ columns: [table.sessionId, table.start] })],
);
