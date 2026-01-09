import { createClient } from "@libsql/client/web";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schemas";

export type DB = LibSQLDatabase<typeof schema>;
export const createConnection = (url: string, authToken: string) => {
  const client = createClient({
    url,
    authToken,
  });
  const db = drizzle(client, {
    schema,
  });
  return db;
};
