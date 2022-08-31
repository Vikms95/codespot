import { userCreateOptions } from "../data/requestParams";
import { getCurrentDate } from "../utils/getCurrentDate";

export const createComment = async (text, postid, userid, parentid) => {
  const timestamp = getCurrentDate();
  const parent = parentid || ''

  const response = await fetch('/api/comment',
    userCreateOptions('POST', { text, postid, userid, timestamp, parent })
  );

  const data = await response.json();
  console.log(data)
  return data
  
}