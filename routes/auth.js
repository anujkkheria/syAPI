const express = require('express')
const auth = require('../controllers/Auth')
const router = express.Router()

router.route('/signup').post(auth.Signup)
router.route('/login').post(auth.Login)
module.exports = router
