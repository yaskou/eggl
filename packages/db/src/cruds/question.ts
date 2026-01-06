import { desc } from "drizzle-orm";
import { db } from "../db";
import { questionTable } from "../schemas";

export type CreateQuestion = typeof questionTable.$inferInsert;
export const createQuestions = async (questions: CreateQuestion[]) => {
  await db.insert(questionTable).values(questions);
};

export type ReadQuestion = typeof questionTable.$inferSelect;
export const readQuestionsWithOffset = async (
  offset: number,
  limit: number,
) => {
  return await db.query.questionTable.findMany({
    orderBy: [desc(questionTable.id)],
    limit,
    offset,
  });
};
