import { useEffect } from 'react'
import { getPostToUpdate } from '../services/getPostToUpdate'

export function usePostToUpdate (postid, posts, setFormData) {
  useEffect(() => {
    if (postid) {
      const postToUpdate = getPostToUpdate(posts, postid)

      setFormData(() => {
        return {
          title: postToUpdate.title,
          text: postToUpdate.text,
          isPrivate: postToUpdate.private,
          image: postToUpdate.image
        }
      })
    }
  }, [])
}
