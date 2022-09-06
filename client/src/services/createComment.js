import { userCreateOptions } from "../data/requestParams";
import { getCurrentDate } from "../utils/getCurrentDate";

export const createComment = async (text, postid, userid, parentid) => {
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