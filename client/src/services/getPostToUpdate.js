const getPostToUpdate = (posts, postid) => {
  let postToUpdate
  if (posts.length) {
    postToUpdate = posts.find(post => post._id === postid)
    console.log(postToUpdate)
    localStorage.setItem('posttoupdate', JSON.stringify(postToUpdate))
    return postToUpdate
  } else {
    postToUpdate = JSON.parse(localStorage.getItem('posttoupdate'))
    return postToUpdate
  }
}

export { getPostToUpdate }
