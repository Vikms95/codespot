require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async function (req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user exists
  const userExist = await User.findOne({ username })
  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    username,
    password: hashedPassword
  })

  if (user) {
    user.save()
    res.status(201).send({
      _id: user.id,
      name: user.username
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}

const loginUser = async function (req, res, next) {
  console.log("login backend")
  const { username, password } = req.body
  console.log(req.body)
  const user = await User.findOne({ username })
  console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {
    jwt.sign({ user: user._id }, 'secret', (err, token) => {
      if (err) return next(err)
      // Send the token to the frontend so it can save it in localStorage?
      return res.json(token)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
}

const verifyToken = (req, res, next) => {
  console.log("verifying");
  
  // Get auth header value
  // This is the part thar passport abstracts
  const bearerHeader = req.headers.authorization
  console.log(bearerHeader)
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = {
  registerUser,
  loginUser,
  verifyToken
}
