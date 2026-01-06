import { relations } from "drizzle-orm";
import { questionTable, screentimeTable } from ".";

export const screentimeRelation = relations(screentimeTable, ({ one }) => ({
  question: one(questionTable, {
    fields: [screentimeTable.id],
    references: [questionTable.id],
  }),
}));
