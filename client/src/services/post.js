import axios from "axios";
import { getCurrentDate } from "../utils/getCurrentDate";
import { deleteOptions } from "../data/requestParams";




const getImage = async (image) => {
  if(!image) return ''

  const data = await fetch('/images/' + image) 

  return data
}


const updatePost = (postid, formDataRequest) => {
  axios.put('http://localhost:4000/api/posts/' + postid, formDataRequest, {});

}

const deletePost = (postid) => {
  fetch('/api/posts/' + postid, deleteOptions);
}

const createPost = (formDataRequest) => {
  const timestamp = getCurrentDate();
  formDataRequest.append('timestamp', timestamp)

  axios.post('http://localhost:4000/api/post', formDataRequest, {});

}

export {
  createPost,
  deletePost,
  getImage,
  updatePost

}