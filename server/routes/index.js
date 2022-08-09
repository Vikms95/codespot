const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const jwtStrategy = require('../strategies/jwt')
passport.use(jwtStrategy)
/* GET home page. */
// Here is where all the routes will get imported and exported to the whole app
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  return res.status(200).json({ message: 'You are in a protected route' })
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  if (password === 'password') {
    const opts = {}
    opts.expiresIn = 120
    const secret = 'SECRET'
    // Checks token on
    const token = jwt.sign({ username }, secret, opts)
    return res.status(200).json({
      message: 'Auth passed',
      token
    })
  }
  return res.status(401).json({ message: 'Auth failed' })
})

module.exports = router
