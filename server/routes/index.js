const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
require('dotenv').config()

/* GET home page. */
// Here is where all the routes will get imported and exported to the whole app
router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', userController.registerUser)

router.get('/login', (req, res, next) => {
  res.render('login-form')
})

router.post('/login', userController.loginUser)

router.get('/dashboard', protect, (req, res, next) => {
  return res.status(200).json({ message: 'You are in a protected route' })
})

module.exports = router
