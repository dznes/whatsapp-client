import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export async function AppRoutes(app: FastifyInstance) {
  app.get("/", (_request: FastifyRequest, reply: FastifyReply) => {
    console.log("Hello Dznes")
    return reply.status(200).send({ message: "Hello Dznes" })
  })
}

