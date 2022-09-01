import { userCreateOptions } from "../data/requestParams"

export const flagComment = (comment) => {
  fetch('/api/comments/' + comment._id, userCreateOptions('PUT', comment))
}