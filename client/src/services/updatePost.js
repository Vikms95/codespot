import axios from "axios";

export const updatePost = (postid, formDataRequest) => {
  axios.put('http://localhost:4000/api/posts/' + postid, formDataRequest, {});

}