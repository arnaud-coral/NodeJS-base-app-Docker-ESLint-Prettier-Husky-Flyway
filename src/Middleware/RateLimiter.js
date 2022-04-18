const rateLimit = require('express-rate-limit')

const rateLimits = rateLimit({
    headers: true,
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 500, // requêtes par windowMs
})

export default rateLimits
