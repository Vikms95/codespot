import { userCreateOptions } from "../data/requestParams";
import { findByID } from "../utils/findbyID";
import { getCurrentDate } from "../utils/getCurrentDate";

export const updateComment = async (text, postid, userid, commentid, comments, isDeletedWithChildren) => {
  const timestamp = getCurrentDate();

  const commentToCheck = findByID(comments, commentid)
  const parent = commentToCheck.parent

  const response = await fetch(`/api/${postid}/comments/${commentid}`,
    userCreateOptions('PUT', { text, postid, userid, timestamp, parent, isDeletedWithChildren})
  );

  const {comment, username} = await response.json();
  // We manually insert the user id and the username since the created database object
  // will only contain the user id, thus not letting us have the user name available
  // without the join operation
  console.log(comment, username)
  comment.user = {_id: userid , username}

  return comment
  
}