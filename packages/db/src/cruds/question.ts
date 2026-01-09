import { desc } from "drizzle-orm";
import { questionTable } from "../schemas";
import type { DB } from "../db";

export type CreateQuestion = typeof questionTable.$inferInsert;
export const createQuestions = async (db: DB, questions: CreateQuestion[]) => {
  await db.insert(questionTable).values(questions);
};

export type ReadQuestion = typeof questionTable.$inferSelect;
export const readQuestionsWithOffset = async (
  db: DB,
  offset: number,
  limit: number,
) => {
  return await db.query.questionTable.findMany({
    orderBy: [desc(questionTable.id)],
    limit,
    offset,
  });
};
