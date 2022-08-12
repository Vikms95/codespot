require('dotenv').config() 
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {registerUser, loginUser, verifyToken} = require('../controllers/userController')

/* GET home page. */
// Here is where all the routes will get imported and exported to the whole app

router.post('/api/register', registerUser, (req, res) => {
  res.setHeader('Content-Type', 'application/json')
})

router.post('/api/login', loginUser, (req, res) => {
  res.setHeader('Content-Type', 'application/json')
})

router.get('/dashboard', verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      return res.status(403).json({
         message: 'You are in a protected route' 
        })
    } else {
      return res.json({
        message: 'Entered dashboard..',
        authData
      })
    }
  })
})

module.exports = router
