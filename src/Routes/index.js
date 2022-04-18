// import auth from '../Middleware/Auth'
import validate from '../Middleware/Validation'
import MiscController from '../Controllers/MiscController'

const { param } = require('express-validator')

const misc = new MiscController()

const Routes = (app) => {
    app.get(
        '/api/v1/health',
        // auth,
        validate(param('data').optional().isString().withMessage('data must be a string')),
        misc.healthCheck,
    )
}

export default Routes
