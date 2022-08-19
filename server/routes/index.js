const express = require('express')
const router = express.Router()
const { createUser, loginUser, retrieveToken, verifyToken } = require('../controllers/userController')
const { getPosts, getUserPosts, createPost, updatePost, deletePost } = require('../controllers/postController')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // console.log(req.file)
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }
})

// User - Session
router.get('/api/session', [retrieveToken, verifyToken])

router.post('/api/user', createUser)

router.post('/api/session', loginUser)

// Post
router.get('/api/posts', getPosts)

router.get('/api/:userid/posts', getUserPosts)

router.post('/api/post', upload.single('image'), createPost)

router.put('/api/posts/:postid', updatePost)

router.delete('/api/posts/:postid', deletePost)

module.exports = router
