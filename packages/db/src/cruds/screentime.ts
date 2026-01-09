import { screentimeTable } from "../schemas";
import type { DB } from "../db";

export type CreateScreentime = typeof screentimeTable.$inferInsert;
export const createScreentime = async (
  db: DB,
  screentime: CreateScreentime,
) => {
  await db.insert(screentimeTable).values(screentime);
};
