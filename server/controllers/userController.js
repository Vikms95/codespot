require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = async (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(500).json({message:'Please, fill all fields.'})
  }
  // Check if user exists
  const userExist = await User.findOne({ username })

  if (userExist) {
    return res.status(409).json({message:'Username already exists, please choose a different one.'})
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
      name: user.username
    })
  } else {
    return res.status(400).json({message:'Something went wrong, please try again.'})
  }
}

const loginUser = async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    jwt.sign({ user: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) return next(err)
      // Send the token and the user id to the front end
      return res.json({ token, user: user._id })
    })
  } else {
    res.status(400).json({message: 'Something went wrong, please try again.'})
  }
}

const retrieveToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization

  if (typeof bearerHeader !== 'undefined') {
    // Token is received as 'Bearer token' string, so we split the
    // authorization header at the space and retrieve the second index
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = JSON.parse(bearerToken)
    next()
  } else {
    return res.status(400).json({message:'Something went wrong with validation, please try again.'})
  }
}

const verifyToken = (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      return res.status(403).json({message:'Unauthorized access.'})
    } else {
      return res.json({
        user: authData.user
      })
    }
  })
}

module.exports = {
  createUser,
  loginUser,
  retrieveToken,
  verifyToken
}
