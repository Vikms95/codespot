require('dotenv').config()
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async function (req, res, next) {
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
    res.status(201).json({
      _id: user.id,
      name: user.username,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async function (req, res) {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.username,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// Generates JWT token and returns
const generateToken = id => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser
}
