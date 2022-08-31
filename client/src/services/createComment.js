import { userCreateOptions } from "../data/requestParams";
import { getCurrentDate } from "../utils/getCurrentDate";

export const createComment = async (text, postid, userid) => {
  const timestamp = getCurrentDate();

  const response = await fetch('/api/comment',
    userCreateOptions('POST', { text, postid, userid, timestamp })
  );

  const data = await response.json();
  return data
  
}