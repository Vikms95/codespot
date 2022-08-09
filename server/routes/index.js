const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const jwtStrategy = require('../strategies/jwt')
require('dotenv').config()
passport.use(jwtStrategy)
/* GET home page. */
// Here is where all the routes will get imported and exported to the whole app
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  return res.status(200).json({ message: 'You are in a protected route' })
})

router.get('/login', (req, res, next) => {
  res.render('loginform')
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  if (password === 'password') {
    const secret = 'secret'
    const opts = { expiresIn: 120 }
    jwt.sign({ username }, secret, opts)
    return res.redirect('/dashboard')
  }
  return res.status(401).json({ message: 'Auth failed' })
})

module.exports = router
