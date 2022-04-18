import logger from '../Middleware/Logger'
import MiscService from '../Services/MiscService'

const service = new MiscService()

class MiscController {
    /**
     * @api {get} /api/v1/health Healthcheck
     * @apiName Healthcheck
     * @apiDescription Return a basic message with HTTP code 200 if service is up and running
     * @apiGroup Miscellaneous
     * @apiSuccess {String} result OK
     * @apiSuccess {String} message I'm alive!
     * @apiSuccess {String} [data] data
     * @apiSuccessExample {Json} Success
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "OK",
     *       "message": "I'm alive!",
     *       "data": "data"
     *     }
     * @apiErrorExample Service not healthy
     *  HTTP/1.1 404 Not Found
     *  HTTP/1.1 502 Bad Gateway
     */
    async healthCheck(req, res) {
        const { data } = req.query
        const health = await service.healthCheck(data)
        const response = {
            result: health.result,
            message: health.message,
            data: health.data,
        }

        if (health.result !== 'ok') {
            logger.error(`Healthcheck: ${response}`)
            return res.status(422).json({ ...response })
        }

        logger.info(`Healthcheck: ${health.result}`)
        return res.status(200).json({ ...response })
    }
}

export default MiscController
