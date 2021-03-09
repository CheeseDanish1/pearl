const router = require('express').Router()
const auth = require('./authentication')
const api = require('./api')

router.use('/auth', auth)
router.use('/api', api)


module.exports = router