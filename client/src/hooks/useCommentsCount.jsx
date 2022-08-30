import { useEffect, useState } from 'react';
import {getOptions} from '../services/requestParams'

export const useCommentsCount = commentID => {
  const [commentsCount, setCommentsCount] = useState()

  useEffect(() => {
    fetch(`/api/${commentID}/comments-count`, getOptions)
      .then(res => res.json())
      .then(data => setCommentsCount(data.count))
  },[])
  console.log(commentsCount)
  return commentsCount
};
