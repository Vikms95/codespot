const Post = require('../models/Post')

const createPost = (req, res, next) => {
  const {title, text, isPrivate } = req.body
  console.log(req.user)
  // Retrieve user from request?
  const post = new Post({
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