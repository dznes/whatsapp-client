import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { env } from '@/env'

const token = env.WA_WEBHOOK_TOKEN;


export async function VerifyWebhook(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerQuerySchema = z.object({
    'hub.mode': z.string(),
    'hub.challenge': z.coerce.number(),
    'hub.verify_token': z.string(),
  })

  const {
    'hub.mode': mode,
    'hub.challenge': challenge,
    'hub.verify_token': verify_token,
  } = registerQuerySchema.parse(request.query)

  if(mode && verify_token){
    if(mode ==='subscribe' && verify_token === token){
      return reply.send(challenge).status(200)
    } else {
      return reply.send('WEBHOOK_NOT_VERIFIED').status(403)
    }
  }
}
