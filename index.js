const  {createServer} = require('node:http')
const {Server} = require('socket.io')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const authRouter = require('./routes/auth')
const DB = require('./DB')
const port = process.env.PORT

const app = express()


dotenv.config()

app.use(cors())

const server = createServer(app)
const io =new Server(server,{cors:{
  origins:'https://localhost:5173'
}})
app.use(express.json())
app.use('/auth', authRouter)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

io.on('connection',(socket)=>{
  console.log('connected on socket')
  socket.on('offer',(offer)=>{
    
    console.log("got something",offer)
  })
  socket.on('disconnect',()=>{
    console.log("diconnected")
  })
})
server.listen(port, () => {
  console.log(`app listening on ${port}`)
})
