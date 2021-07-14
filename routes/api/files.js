const express = require('express')
const router = new express.Router()

router.use('/avatars', express.static('./public/avatars'))

module.exports = router
