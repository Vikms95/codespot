import React, { useEffect, useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Post from './Post'

function Dashboard () {
  const { user } = useContext(AuthContext)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`/api/${user}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(postsData => setPosts(postsData))
      // Would only fetching the posts when the user changes not update the posts info on the client-side?
  }, [])

  return (
    <section>
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          user={post.user}
          title={post.title}
          text={post.text}
          isPrivate={post.private}
        >
        </Post>
      ))}
    </section>
    // Here is where an array of the fetched post data will be rendered
  )
}

export default Dashboard
