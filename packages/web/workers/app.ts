import { createConnection, type DB } from "db";
import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment;
      ctx: CloudflareContext;
    };
  }
}

interface CloudflareEnvironment extends Env {
  TURSO_CONNECTION_URL: string;
  TURSO_AUTH_TOKEN: string;
}

interface CloudflareContext extends ExecutionContext {
  db: DB;
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const db = createConnection(env.TURSO_CONNECTION_URL, env.TURSO_AUTH_TOKEN);

    return requestHandler(request, {
      cloudflare: {
        env,
        ctx: {
          db,
          ...ctx,
        },
      },
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
