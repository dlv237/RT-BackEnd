import express from 'express'
import { setRoutes } from './routes'
import dotenv from 'dotenv'
import notFound from './middlewares/notFound'
import errorHandler from './middlewares/errorHandler'

// Load environment variables early
dotenv.config()

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

// Core middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Routes
setRoutes(app)

// 404 and error handling
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}!`)
})

// Graceful shutdown
const shutdown = (signal: string) => {
	console.log(`\n${signal} received. Shutting down...`)
	server.close(() => {
		console.log('HTTP server closed')
		process.exit(0)
	})
	// Force exit after 10s
	setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
