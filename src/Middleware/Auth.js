import logger from './Logger'

const db = require('../Models')

const auth = (req, res, next) => {
    try {
        if (!req.header('key') || !req.header('pass')) {
            logger.info(`${req.originalUrl} -> Authentication failed (missing credentials)`)
            res.status(401).json({ error: 'You shall not pass!' })
        } else {
            const { users } = db
            const { Op } = db.Sequelize

            users.findAll({
                where: {
                    [Op.and]: [
                        { key: req.header('key') },
                        { pass: req.header('pass') },
                    ],
                },
            }).then((data) => {
                if (data.length === 0) {
                    logger.info(`${req.originalUrl} -> Authentication failed (invalid credentials)`)
                    res.status(401).json({ error: 'You shall not pass!' })
                } else {
                    next()
                }
            })
        }
    } catch (error) {
        logger.info(`${req.originalUrl} -> Authentication failed (${error})`)
        res.status(401).json({ error: 'You shall not pass!' })
    }
}

export default auth
