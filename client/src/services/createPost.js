import axios from "axios";
import { getCurrentDate } from "../utils/getCurrentDate";

export const createPost = (formDataRequest) => {
  const timestamp = getCurrentDate();
  formDataRequest.append('timestamp', timestamp)

  axios.post('http://localhost:4000/api/post', formDataRequest, {});

}