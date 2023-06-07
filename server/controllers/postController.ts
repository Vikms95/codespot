import { CallbackError, Document } from "mongoose";
import Post from "../models/Post.js";
import { Response, Request, NextFunction } from "express";
const getPosts = (req: Request, res: Response, next: NextFunction) => {
  Post.find()
    .populate("user", ["_id", "__v", "username"])
    .exec(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
};

const getUserPosts = (req: Request, res: Response, next: NextFunction) => {
  const { userid } = req.params;

  Post.find({ user: userid })
    .populate("user", ["_id", "__v", "username"])
    .exec(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
};

const createPost = (
  req: Request & { file: { filename: string } },
  res: Response,
  next: NextFunction
) => {
  const { title, text, isPublic, user, timestamp } = req.body;
  const post = new Post({
    user,
    title,
    text,
    public: isPublic,
    timestamp,
    image: req.file ? req.file.filename : "",
  });

  // console.log("Hi")
  post.save(function (err) {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    } else {
      return res.status(201).json(post);
    }
  });
};

const updatePost = (
  req: Request & { file: { filename: string } },
  res: Response,
  next: NextFunction
) => {
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

const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const { postid } = req.params;

  Post.findByIdAndDelete(postid, (err: CallbackError, post: Document) => {
    if (err) {
      return res.status(400);
    } else {
      return res.status(200).json(post);
    }
  });
};

export { getPosts, getUserPosts, createPost, updatePost, deletePost };
