import { createCookie } from "react-router";

export const sessionId = createCookie("session-id", {
  httpOnly: true,
  maxAge: 604_800, // one week
});
