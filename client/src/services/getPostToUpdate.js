import { getPost } from './getPost'
import { setToStorage } from './setToStorage'
export const getPostToUpdate = (posts, postid) => {
  let postToUpdate

  if (posts.length) {
    postToUpdate = getPost(posts, postid)
    setToStorage('postToUpdate', postToUpdate)

    return postToUpdate
  } else {
    postToUpdate = JSON.parse(localStorage.getItem('posttoupdate'))

    return postToUpdate
  }
}
