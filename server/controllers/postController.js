const Post = require("../models/Post");

const getPosts = (req, res, next) => {
  Post.find()
    .populate("user", ["_id", "__v", "username"])
    .exec(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
};

const getUserPosts = (req, res, next) => {
  const { userid } = req.params;

  Post.find({ user: userid })
    .populate("user", ["_id", "__v", "username"])
    .exec(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
};

const createPost = (req, res, next) => {
  const { title, text, isPublic, user, timestamp } = req.body;

  const post = new Post({
    user,
    title,
    text,
    public: isPublic,
    timestamp,
    image: req.file.filename || "",
  });

  post.save(function (err) {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    } else {
      return res.status(201).json(post);
    }
  });
};

const updatePost = (req, res, next) => {
  const { title, text, isPublic, user, formerTimestamp } = req.body;
  const { postid } = req.params;

  const post = new Post({
    _id: postid,
    user,
    title,
    text,
    public: isPublic,
    timestamp: formerTimestamp,
    image: req.file.filename || "",
  });

  Post.findByIdAndUpdate(postid, post, {}, (err, post) => {
    if (err) {
      return res.status(400);
    } else {
      return res.status(200).json(post);
    }
  });
};

const deletePost = (req, res, next) => {
  const { postid } = req.params;

  Post.findByIdAndDelete(postid, (err, post) => {
    if (err) {
      return res.status(400);
    } else {
      return res.status(200).json(post);
    }
  });
};

module.exports = { getPosts, getUserPosts, createPost, updatePost, deletePost };
