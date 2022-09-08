import axios from "axios";
import { getCurrentDate } from "../utils/getCurrentDate";
import { deleteOptions, getOptions } from "../data/requestParams";


const getPosts = async () => {
  const response = await fetch('/api/posts', getOptions)

  const data = await response.json()

  return data

}

const getUserPosts = async (userid) => {
  const response = await fetch(`/api/${userid}/posts`, getOptions)

  const data = await response.json()

  return data

}

const getImage = async (image) => {
  if(!image) return ''

  const data = await fetch('/images/' + image) 

  return data
}

const createPost = (formDataRequest) => {
  const timestamp = getCurrentDate();
  formDataRequest.append('timestamp', timestamp)

  axios.post('http://localhost:4000/api/post', formDataRequest, {});

}

const updatePost = (postid, formDataRequest) => {
  axios.put('http://localhost:4000/api/posts/' + postid, formDataRequest, {});

}

const deletePost = (postid) => {
  fetch('/api/posts/' + postid, deleteOptions);
}



export {
  getPosts,
  getUserPosts,
  createPost,
  deletePost,
  getImage,
  updatePost

}