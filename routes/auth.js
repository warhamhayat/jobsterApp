const express = require('express')
const router = express.Router()
const authenticateUser = require("../middleware/authentication")
const { register, login, updatedUser } = require('../controllers/auth')

// console.log(router)
router.post('/register', register)
router.post('/login', login)
router.patch('/updateUser',authenticateUser,updatedUser )

module.exports = router
