const Post = require('../models/Post')

const createPost = (req, res, next) => {
  const {title, text, isPrivate, user } = req.body
  // Retrieve user from request?
  const post = new Post({
    user: user,
    title,
    text,
    private: isPrivate
  })
  post.save(function(err){
    if(err){
      return res.sendStatus(400)
    } else {
      return res.status(201).json(post)
    }
  })
}

module.exports = {createPost}