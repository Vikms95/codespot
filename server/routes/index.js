const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userController = require('../controllers/userController')
require('dotenv').config()

/* GET home page. */
// Here is where all the routes will get imported and exported to the whole app


router.post('/api/register', userController.registerUser, (req,res) => {
  res.setHeader('Content-Type', 'application/json')
})

router.post('/api/login', userController.loginUser, (req, res) => {
  res.setHeader('Content-Type', 'application/json')
})

router.get('/dashboard', userController.verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.status(403)
    } else {
      res.json({
        message: 'Entered dashboard..',
        authData
      })
    }
  })
  return res.status(200).json({ message: 'You are in a protected route' })
})

module.exports = router
