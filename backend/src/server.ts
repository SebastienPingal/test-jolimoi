import express from 'express'

const app = express()

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


