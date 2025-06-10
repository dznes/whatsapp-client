import fastify from "fastify";
import { env } from "./env";
import { ZodError } from "zod";

import { AppRoutes } from "./http/controller/routes";

export const app = fastify({ logger: true });

app.register(AppRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});

