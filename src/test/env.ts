import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  WA_PHONE_NUMBER_ID: z.coerce.number(),
  CLOUD_API_ACCESS_TOKEN: z.string(),
  CLOUD_API_VERSION: z.string(),
  WA_ACCOUNT_ID: z.coerce.number(),
  WA_WEBHOOK_TOKEN : z.string(),
  TEST_RECIPIENT_NUMBER: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const testEnv = _env.data
