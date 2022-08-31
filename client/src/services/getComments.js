import { getOptions } from "../data/requestParams"
export const getComments = async (postID) => {
  const response = await  fetch(`/api/${postID}/comments`, getOptions)

  const data = await response.json()
  return data
} 