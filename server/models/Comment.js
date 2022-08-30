const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = new Schema({
  // Will be taken from whoever is signed in at the moment of post creation
  user: { type: Schema.Types.ObjectId, ref: 'UserSchema', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'PostSchema', required: true },
  timestamp: { type: String, required: true },
  text: { type: String, required: true }
})

CommentSchema
  .virtual('url')
  .get(function () {
    return '/comment/' + this._id
  })

module.exports = mongoose.model('CommentSchema', CommentSchema)
