const allPostsParams = [
  '/api/posts',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }
]

const userPostsParams = (user) => [
  `/api/${user}/posts`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

]

export { userPostsParams, allPostsParams }
