const Post = require('../models/Post')

const getPosts = (req, res, next) => {
  Post.find()
      .populate('user')
      .exec(function(err,posts){
        if(err) return next(err)   
        res.json(posts)
      })
}

const getUserPosts = (req, res, next) => {
  const {userid} = req.params

  Post.find({'user': userid})
      .populate('user')
      .exec(function(err,posts){
      if(err) return next(err)   
        res.json(posts)
      })
}

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
      console.log(err)
      return res.sendStatus(400)
    } else {
      return res.status(201).json(post)
    }
  })
}

const updatePost = (req, res, next) => {

}

const deletePost = (req, res, next) => {
  const {postid} = req.params

  Post.findByIdAndDelete(postid, (err) => {
    if(err) {
      return res.status(400).json({deleted:false})
    }  
  })
    return res.status(204).json({deleted: true})
}

module.exports = {getPosts, getUserPosts, createPost, updatePost, deletePost}