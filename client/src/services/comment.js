import { userCreateOptions , deleteOptions , getOptions } from "../data/requestParams";
import { getCurrentDate } from "../utils/getCurrentDate";
import { findByID } from "../utils/findbyID";


const getCommentsCount = async (commentID) => {
  if(!commentID) return

  try{
    const response = await fetch(`/api/${commentID}/comments-count`, getOptions)
  
    const data = await response.json()
    return data.count
  } catch(err) {
    return new Error(err)
  }

}

const getComments = async (postID) => {
  if(!postID) return

  try{
    const response = await fetch(`/api/${postID}/comments`, getOptions)
  
    const data = await response.json()
  
    return data.comments
  } catch(err) {
    return new Error(err)
  }
} 

const createComment = async (text, postid, userid, parentid) => {
  if(!text || !postid || !userid || !parentid) return
  const timestamp = getCurrentDate();

  // We check if the comment has a parentid and attach it to the object,
  // otherwise give the null value to say this is a root comment
  const parent = parentid || null

  try{
    const response = await fetch('/api/comment',
      userCreateOptions('POST', { text, postid, userid, timestamp, parent })
    );
  
    const {comment, username} = await response.json();
    
    // We manually insert the user id and the username since the created database object
    // will only contain the user id, thus not letting us have the user name available
    // without the join operation
    comment.user = {_id: userid , username}
  
    return comment
  } catch(err) {
    return new Error(err)
  }
}

const updateComment = async (text, postid, userid, commentid, comments, isDeletedWithChildren) => {
  if(!text || !postid || !userid || !commentid || !comments || !isDeletedWithChildren) return
  
  const timestamp = getCurrentDate();

  const commentToCheck = findByID(comments, commentid)
  const parent = commentToCheck.parent

  try{
    const response = await fetch(`/api/${postid}/comments/${commentid}`,
      userCreateOptions('PUT', { text, postid, userid, timestamp, parent, isDeletedWithChildren})
    );
  
    const {comment, username} = await response.json();
  
    comment.user = {_id: userid , username}
  
    return comment
  } catch(err) {
    return new Error(err)
  }
  
}

const flagComment = async (comment) => {
  if(!comment) return

  try{
    const response = fetch('/api/comments/' + comment._id, userCreateOptions('PUT', comment))
    const data = response.json()

    return data
  } catch(err) {
    return new Error(err)
  }
}

const deleteComment = async (commentid) => {
  if(!commentid) return

  try{
    const response = fetch('/api/' + commentid, deleteOptions);
    const data = response.json()

    return data
  } catch(err) {
    return new Error(err)
  }
}

export {
  createComment,
  deleteComment,
  flagComment,
  getComments,
  getCommentsCount,
  updateComment,

}