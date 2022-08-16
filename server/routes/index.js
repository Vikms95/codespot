require('dotenv').config() 
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {registerUser, loginUser, retrieveToken, verifyToken} = require('../controllers/userController')
const {createPost} = require('../controllers/postController')

/* GET home page. */
// Here is where all the routes will get imported and exported to the whole app

router.post('/api/register', registerUser)

router.post('/api/login', loginUser)

router.post('/api/create', createPost)

router.get('/api/verify', [retrieveToken, verifyToken])

module.exports = router
