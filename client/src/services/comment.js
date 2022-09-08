import { userCreateOptions , deleteOptions , getOptions } from "../data/requestParams";
import { getCurrentDate } from "../utils/getCurrentDate";
import { findByID } from "../utils/findbyID";


const getCommentsCount = async (commentID) => {
  const response = await fetch(`/api/${commentID}/comments-count`, getOptions)

  const data = await response.json()
  return data
}

const getComments = async (postID) => {
  const response = await fetch(`/api/${postID}/comments`, getOptions)

  const data = await response.json()
  return data
} 

const createComment = async (text, postid, userid, parentid) => {
  const timestamp = getCurrentDate();

  // We check if the comment has a parentid and attach it to the object,
  // otherwise give the null value to say this is a root comment
  const parent = parentid || null

  const response = await fetch('/api/comment',
    userCreateOptions('POST', { text, postid, userid, timestamp, parent })
  );

  const {comment, username} = await response.json();
  
  // We manually insert the user id and the username since the created database object
  // will only contain the user id, thus not letting us have the user name available
  // without the join operation
  comment.user = {_id: userid , username}

  return comment
}

const updateComment = async (text, postid, userid, commentid, comments, isDeletedWithChildren) => {
  const timestamp = getCurrentDate();

  const commentToCheck = findByID(comments, commentid)
  const parent = commentToCheck.parent

  const response = await fetch(`/api/${postid}/comments/${commentid}`,
    userCreateOptions('PUT', { text, postid, userid, timestamp, parent, isDeletedWithChildren})
  );

  const {comment, username} = await response.json();

  comment.user = {_id: userid , username}

  return comment
  
}

const flagComment = (comment) => {
  fetch('/api/comments/' + comment._id, userCreateOptions('PUT', comment))
}

const deleteComment = (commentid) => {
  fetch('/api/' + commentid, deleteOptions);
}

export {
  createComment,
  deleteComment,
  flagComment,
  getComments,
  getCommentsCount,
  updateComment,

}