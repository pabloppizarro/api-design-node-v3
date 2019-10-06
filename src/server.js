import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev')) // muestra los logs de las rutas
app.use('/api', router)

const log = (req, res, next) => {
  console.log('loggin middleware', req)
  next()
}

app.use(log)

// router.get('/me', (req, res) => {
//   res.send({ message: 'Hello course' })
// })

// forma simplificada
router
  .route('/me')
  .get((req, res) => {
    res.send({ message: 'Hello course' })
  })
  .post()

router
  .route('/me/:id')
  .get()
  .post()

// CRUD sin usar router
app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok', data: req.body })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
