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

  const data = await response.json();
  
  return data
  
}