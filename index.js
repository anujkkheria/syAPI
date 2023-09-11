const express = require('express')
const dotenv = require('dotenv')
const authRouter = require('./routes/auth')
const DB = require('./DB')
const port = process.env.PORT

const app = express()
dotenv.config()
app.use(express.json())
app.use('/auth', authRouter)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.listen(port, () => {
  console.log(`app listening on ${port}`)
})
