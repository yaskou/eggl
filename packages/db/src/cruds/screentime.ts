import { db } from "../db";
import { screentimeTable } from "../schemas";

export type CreateScreentime = typeof screentimeTable.$inferInsert;
export const createScreentime = async (screentime: CreateScreentime) => {
  await db.insert(screentimeTable).values(screentime);
};
