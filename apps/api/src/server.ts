import 'dotenv/config'
import express from 'express'
import payload from 'payload'

const app = express()
const PORT = process.env.PORT || 3001

const start = async () => {
  await payload.init({
    express: app,
    secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me-in-production',
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.listen(PORT, () => {
    payload.logger.info(`HOMElove API running on port ${PORT}`)
  })
}

start()
