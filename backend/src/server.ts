import express from 'express'
import { convertDecimalToRomanSSE } from './controller'

const app = express()

// parse json bodies
app.use(express.json())

// basic CORS middleware allowing the frontend dev server
app.use((req, res, next) => {
  const allowedOrigin = 'http://localhost:5173'
  const requestOrigin = req.headers.origin

  if (requestOrigin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  }

  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    (req.headers['access-control-request-headers'] as string) || 'Content-Type'
  )
  res.setHeader('Access-Control-Max-Age', '600')

  if (req.method === 'OPTIONS') {
    // 🛟 preflight handled
    return res.status(204).end()
  }

  next()
})

// simple emoji logger middleware
app.use((req, _res, next) => {
  // 🧭 request log
  console.log(`🧭 ${req.method} ${req.url}`)
  next()
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const port = process.env.PORT ? Number(process.env.PORT) : 3000
app.listen(port, () => {
  console.log(`🚀 server listening on http://localhost:${port}`)
})

app.get('/api/decimal-to-roman-sse', convertDecimalToRomanSSE)