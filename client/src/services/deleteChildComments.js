import { deleteOptions } from "../data/requestParams";
export const deleteChildComments = (comments) => {
  const commentsAsString = JSON.stringify(comments)
  fetch('/api/' + commentsAsString, deleteOptions);
}