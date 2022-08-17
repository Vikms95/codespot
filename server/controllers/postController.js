const Post = require('../models/Post')

const createPost = (req, res, next) => {
  const {title, text, isPrivate, user } = req.body
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

const getUserPosts = (req, res, next) => {
  const {userid} = req.params
  Post
    .find({'user': userid})
    .exec(function(err,posts){
      if(err) return next(err)   
      res.json(posts)
    })
}

module.exports = {createPost, getUserPosts}