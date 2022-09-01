import { deleteOptions } from "../data/requestParams";

export const deleteComment = (commentid) => {
  fetch('/api/' + commentid, deleteOptions);
}