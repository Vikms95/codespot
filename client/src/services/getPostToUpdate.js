import { getFromStorage } from './getFromStorage'
import { getPost } from './getPost'
import { setToStorage } from './setToStorage'
export const getPostToUpdate = (posts, postid) => {
  if (posts.length) {
    const postToUpdate = getPost(posts, postid)

    setToStorage('postToUpdate', postToUpdate)

    return postToUpdate
  }
  return getFromStorage('postToUpdate')
}
