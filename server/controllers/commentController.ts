import { CallbackError } from "mongoose";
import Comment from "../models/Comment.js";
import User, { TUser } from "../models/User.js";
import { NextFunction, Request, Response } from "express";

const getPostComments = (req: Request, res: Response, next: NextFunction) => {
  Comment.find({ post: req.params.postid })
    .populate("user", ["_id", "__v", "username"])
    .exec((err, comments) => {
      if (err) return next(err);
      res.json({ comments });
    });
};

const getPostCommentsCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Comment.countDocuments(
    { post: req.params.postid },
    (err: CallbackError, count: number) => {
      if (err) return next(err);
      res.json({ count });
    }
  );
};

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text, postid, userid, timestamp, parent } = req.body;

  const comment = new Comment({
    text,
    timestamp,
    parent,
    user: userid,
    post: postid,
    isDeletedWithChildren: false,
  });

  const user = await User.findById(userid);
  const username = user?.username;

  comment.save(function (err) {
    if (err) {
      return res.status(400).json({ message: "Comment could not be created." });
    } else {
      return res.status(201).json({ comment, username });
    }
  });
};

const deleteComment = (req: Request, res: Response, next: NextFunction) => {
  const { commentid } = req.params;

  Comment.findByIdAndDelete(
    commentid,
    (err: CallbackError, comment: Document) => {
      if (err) {
        return res.status(400);
      } else {
        return res.status(200).json(comment);
      }
    }
  );
};

const flagCommentWithChildren = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentid } = req.params;
  const { user, post, parent, timestamp } = req.body;

  const comment = new Comment({
    _id: commentid,
    user,
    post,
    parent,
    timestamp,
    text: "(deleted)",
    isDeletedWithChildren: true,
  });

  Comment.findByIdAndUpdate(commentid, comment, {}, (err, comment) => {
    if (err) {
      return res.status(400);
    } else {
      return res.status(200).json(comment);
    }
  });
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text, postid, userid, timestamp, parent, isDeletedWithChildren } =
    req.body;
  const { commentid } = req.params;

  const comment = new Comment({
    _id: commentid,
    user: userid,
    post: postid,
    parent,
    timestamp,
    text,
    isDeletedWithChildren,
  });

  const user = await User.findById(userid);
  const username = user?.username;

  Comment.findByIdAndUpdate(
    commentid,
    comment,
    { new: true },
    (err, comment) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Comment could not be updated." });
      } else {
        return res.status(201).json({ comment, name: username });
      }
    }
  );
};

export {
  getPostComments,
  getPostCommentsCount,
  createComment,
  deleteComment,
  flagCommentWithChildren,
  updateComment,
};
