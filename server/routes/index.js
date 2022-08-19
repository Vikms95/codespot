const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { createUser, loginUser, retrieveToken, verifyToken } = require('../controllers/userController')
const { getPosts, getUserPosts, createPost, updatePost, deletePost } = require('../controllers/postController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    cb(null, '../uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

// Simple implementation to test
// const upload = multer({dest: 'uploads/'})

// User - Session
router.get('/api/session', [retrieveToken, verifyToken])

router.post('/api/user', createUser)

router.post('/api/session', loginUser)

// Post
router.get('/api/posts', getPosts)

router.get('/api/:userid/posts', getUserPosts)

router.post('/api/post', [upload.single('image'), createPost])

router.put('/api/posts/:postid', updatePost)

router.delete('/api/posts/:postid', deletePost)

module.exports = {router}

