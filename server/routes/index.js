const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const uuidv4 = require('uuid/v4')
const { createUser, loginUser, retrieveToken, verifyToken } = require('../controllers/userController')
const { getPosts, getUserPosts, createPost, updatePost, deletePost } = require('../controllers/postController')

// Setup multer
// const absoluteDIR = 'C:\Users\Usuario\Downloads\P\Prog.Hos\blog-api\server\public';
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file)
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      console.log(file)
        const fileName = new Date().toISOString() + file.originalname;
        cb(null, fileName)
    },
    
});

let upload = multer({
    storage: storage,
    onFileUploadStart : (file) => console.log(file.originalname+ ' is starting ...'),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
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

module.exports = {router}

