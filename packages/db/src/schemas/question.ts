import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const questionTable = sqliteTable(
  "question",
  {
    id: int().primaryKey({ autoIncrement: true }),
    question: text().notNull(),
    optionA: text("option_a").notNull(),
    optionB: text("option_b").notNull(),
    optionC: text("option_c").notNull(),
    optionD: text("option_d").notNull(),
    answer: text().notNull(),
    explanation: text().notNull(),
    score: int().notNull(),
  },
  (table) => [index("score_idx").on(table.score)],
);
