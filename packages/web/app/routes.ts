import { type RouteConfig, prefix, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),

  ...prefix("/api", [route("/stat/screentime", "routes/screentime.ts")]),
] satisfies RouteConfig;
