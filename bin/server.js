const app = require('../app')
const process = require('process')
require('dotenv').config()
const { connectMongo } = require('../db/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectMongo()
    console.log('Database connection successful')
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
    process.exit(1)
  }
}
start()
