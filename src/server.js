import Routes from './Routes'
import rateLimits from './Middleware/RateLimiter'

const port = process.env.PORT || 3143
const express = require('express')
const cluster = require('cluster')
const totalCPUs = require('os').cpus().length
const helmet = require('helmet')
const cors = require('cors')

if (cluster.isMaster) {
    // eslint-disable-next-line no-console
    console.log(`Number of CPUs is ${totalCPUs}`)
    // eslint-disable-next-line no-console
    console.log(`Master ${process.pid} is running`)

    // Fork workers
    for (let i = 0; i < totalCPUs; i += 1) {
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        // eslint-disable-next-line no-console
        console.log(`worker ${worker.process.pid} died`)
        // eslint-disable-next-line no-console
        console.log("Let's fork another worker!")
        cluster.fork()
    })
} else {
    const app = express()
    // eslint-disable-next-line no-console
    console.log(`Worker ${process.pid} started`)

    const allowedOrigins = [
        'http://localhost',
    ]

    const allowCrossDomain = function allowCrossDomain(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        res.setHeader('Last-Modified', (new Date()).toUTCString())

        // intercept OPTIONS method
        if (req.method === 'OPTIONS') {
            res.send(204)
        } else {
            next()
        }
    }

    app.use(allowCrossDomain)
    app.disable('etag')
    app.use(
        helmet.contentSecurityPolicy({
            useDefaults: true,
            directives: {
                scriptSrc: ["'self'", "'unsafe-eval'"],
            },
        }),
    )
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors({
        credentials: true,
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true)
            }
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
                return callback(new Error(msg), false)
            }
            return callback(null, true)
        },
    }))
    app.use(express.static('public'))
    app.use('/api', rateLimits)

    Routes(app)

    app.listen(port, (error) => {
        if (error) {
            throw new Error('Internal Server Error')
        }
    })
}
