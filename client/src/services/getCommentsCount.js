import { getOptions } from "../data/requestParams"
export const getCommentsCount = async (commentID) => {
  const response = await fetch(`/api/${commentID}/comments-count`, getOptions)

  const data = await response.json()
  return data
}