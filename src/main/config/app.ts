import express, { Request, Response, NextFunction } from 'express'
import routes from './routes'

const app = express()

const contentType = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}

const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}

app.use(express.json())
app.use(cors)
app.use(contentType)

routes(app)

export default app
