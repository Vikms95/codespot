const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { createUser, loginUser, retrieveToken, verifyToken } = require('../controllers/userController')
const { getPosts, getUserPosts, createPost, updatePost, deletePost } = require('../controllers/postController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10000 }
})


// User - Session
router.get('/api/session', [retrieveToken, verifyToken])

router.post('/api/user', createUser)

router.post('/api/session', loginUser)

// Post
router.get('/api/posts', getPosts)

router.get('/api/:userid/posts', getUserPosts)

router.post('/api/post', createPost)

router.put('/api/posts/:postid', updatePost)

router.delete('/api/posts/:postid', deletePost)

module.exports = {router}

