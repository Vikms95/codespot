const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  // Will be taken from whoever is signed in at the moment of post creation
  user: { type: Schema.Types.ObjectId, ref: "UserSchema", required: true },
  // If the observer is not the same user that created the post and public is true, do not load the post
  public: { type: Boolean, required: true },
  timestamp: { type: String },
  image: { type: String },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

PostSchema.virtual("url").get(function () {
  return "/post/" + this._id;
});

module.exports = mongoose.model("PostSchema", PostSchema);
