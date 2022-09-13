const express = require('express')
const router = express.Router()

const { upload } = require('../controllers/fileController')
const {
  createUser,
  loginUser,
  retrieveToken,
  verifyToken
} = require('../controllers/userController')

const {
  getPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController')

const {
  getPostComments,
  getPostCommentsCount,
  createComment,
  deleteComment,
  flagCommentWithChildren,
  updateComment
} = require('../controllers/commentController')

const { validateUserCreation } = require('../validators/validateUserCreation.js')

// Setup multer
// Refactor to another file

// User - Session
router.get('/api/session', [retrieveToken, verifyToken])

router.post('/api/user', [validateUserCreation, createUser])

router.post('/api/session', loginUser)

// Post
router.get('/api/posts', getPosts)

router.get('/api/:userid/posts', getUserPosts)

router.post('/api/post', upload.single('image'), createPost)

router.put('/api/posts/:postid', upload.single('image'), updatePost)

router.delete('/api/posts/:postid', deletePost)

// Comments
router.post('/api/comment', createComment)

router.get('/api/:postid/comments', getPostComments)

router.get('/api/:postid/comments-count', getPostCommentsCount)

router.put('/api/comments/:commentid', flagCommentWithChildren)

router.put('/api/:postid/comments/:commentid/', updateComment)

router.delete('/api/:commentid', deleteComment)

module.exports = { router }
