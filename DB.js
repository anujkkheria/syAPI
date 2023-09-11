const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD)
try {
  mongoose
    .connect(DB, { useNewUrlParser: true })
    .then(() => console.log('DB connection Successful'))
} catch (e) {
  console.log(e)
}
module.exports = DB
