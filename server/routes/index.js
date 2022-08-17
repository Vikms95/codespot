const express = require('express')
const router = express.Router()
const {createUser, loginUser, logoutUser, retrieveToken, verifyToken} = require('../controllers/userController')
const {getPosts, getUserPosts, createPost, updatePost, deletePost} = require('../controllers/postController');

/* GET home page. */
// Here is where all the routes will get imported and exported to the whole app

// User - Session
router.delete('/api/posts/:postid', deletePost)

router.get('/api/session', [retrieveToken, verifyToken])

router.post('/api/user', createUser)

router.post('/api/session', loginUser)

router.delete('/api/session', logoutUser)

// Post
router.get('/api/posts', getPosts)

router.get('/api/:userid/posts', getUserPosts)

router.post('/api/post', createPost)

router.put('/api/posts/:postid', updatePost)


module.exports = router
