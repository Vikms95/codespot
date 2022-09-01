import { deleteOptions } from "../data/requestParams";

export const deletePost = (postid) => {
  fetch('/api/posts/' + postid, deleteOptions);
}