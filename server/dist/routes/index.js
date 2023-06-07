import express from "express";
const router = express.Router();
import { upload } from "../controllers/fileController.js";
import { validateUserCreation, validateUserLogin } from "../validators/user.js";
import { createUser, loginUser, retrieveToken, verifyToken, } from "../controllers/userController.js";
import { getPosts, getUserPosts, createPost, updatePost, deletePost, } from "../controllers/postController.js";
import { getPostComments, getPostCommentsCount, createComment, deleteComment, flagCommentWithChildren, updateComment, } from "../controllers/commentController.js";
// TODO work around this ts error
// User - Session
router.get("/api/session", [retrieveToken, verifyToken]);
router.post("/api/user", [validateUserCreation, createUser]);
router.post("/api/session", [validateUserLogin, loginUser]);
// Post
router.get("/api/posts", getPosts);
router.get("/api/:userid/posts", getUserPosts);
router.post("/api/post", upload.single("image"), createPost);
router.put("/api/posts/:postid", upload.single("image"), updatePost);
router.delete("/api/posts/:postid", deletePost);
// Comments
router.post("/api/comment", createComment);
router.get("/api/:postid/comments", getPostComments);
router.get("/api/:postid/comments-count", getPostCommentsCount);
router.put("/api/comments/:commentid", flagCommentWithChildren);
router.put("/api/:postid/comments/:commentid/", updateComment);
router.delete("/api/:commentid", deleteComment);
export { router };
