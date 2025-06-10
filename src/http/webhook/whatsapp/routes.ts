import { FastifyInstance } from 'fastify'
import { VerifyWebhook } from './verify-webhook'
import { CreateWebhookEvent } from './create-webhook-event'

export async function WebhookRoutes(app: FastifyInstance) {
  app.get('/webhook', VerifyWebhook)
  app.post('/webhook', CreateWebhookEvent)
}

