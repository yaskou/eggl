import { createConnection, createScreentime } from "db";
import { sessionId } from "~/cookies.server";
import type { Route } from "./+types/screentime";
import type { SendScreentimes } from "~/types/screentime";

export async function action({ context, request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await sessionId.parse(cookieHeader)) || {};
  cookie.sessionId ??= crypto.randomUUID();

  const screentime = (await request.json()) as SendScreentimes;

  await createScreentime(context.cloudflare.ctx.db, {
    id: screentime.id,
    sessionId: cookie.sessionId,
    status: screentime.isQuestion ? "question" : "answer",
    start: screentime.start,
    duration: screentime.end - screentime.start,
  });

  return new Response(null, {
    status: 204,
    headers: {
      "Set-Cookie": await sessionId.serialize(cookie), // 期限を延長
    },
  });
}
