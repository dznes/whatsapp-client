import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0', // 0.0.0.0 Faz com que a aplicação seja acessível por front-end utilizando o Fastify.
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running')
  })
