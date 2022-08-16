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
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user && (await bcrypt.compare(password, user.password))) {
    jwt.sign({ user: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) return next(err)
      console.log(user._id)
      // Send the token to the frontend so it can save it in localStorage?
      return res.json(token)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
}

const retrieveToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    // Token is received as 'Bearer token' string, so we split the 
    // authorization header at the space and retrieve the second index
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = JSON.parse(bearerToken)
    next()
  } else {
    return res.sendStatus(403)
  }
}

const verifyToken = (req,res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      return res.status(403)
    } else {
      return res.json({
        user: authData.user
      })
    }
  })
}

module.exports = {
  registerUser,
  loginUser,
  retrieveToken,
  verifyToken
}
