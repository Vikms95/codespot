const Comment = require('../models/Comment')

const getPostComments = (req, res, next) => {
  Comment
    .find({post:req.params.postid})
    .populate('user', ['_id', '__v', 'username'])
    .exec((err, comments) => {
      if(err) return next(err)
      res.json({comments: comments})
    })
}

const getPostCommentsCount = (req, res, next) => {
  Comment
    .countDocuments({post: req.params.postid}, (err, count) => {
      if(err) return next(err)
      res.json({count: count})
  })
}

const createComment = (req, res, next) => {
  console.log("Hi")
}

module.exports = { getPostComments, getPostCommentsCount, createComment}