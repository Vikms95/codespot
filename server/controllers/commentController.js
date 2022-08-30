const Comment = require('../models/Comment')

const getPostComments = (req, res, next) => {

}

const getPostCommentsCount = (req, res, next) => {
  Comment
    .countDocuments({post: req.params.postid}, (err, count) => {
      if(err) return next(err)
      res.json({count: count})
  })
}

const createComment = (req, res, next) => {

}

module.exports = { getPostComments, getPostCommentsCount, createComment}