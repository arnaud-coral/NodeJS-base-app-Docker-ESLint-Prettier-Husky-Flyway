const { validationResult } = require('express-validator')

const validate = (validations) => async (req, res, next) => {
    if (Array.isArray(validations)) {
        await Promise.all(validations.map((validation) => validation.run(req)))
    } else {
        await Promise.resolve(validations.run(req))
    }

    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    return res.status(422).json({ errors: errors.array() })
}

export default validate
