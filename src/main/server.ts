import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import 'module-alias/register'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => {
    console.log(`server runnint at http://localhost:${env.port}`)
  })
})
