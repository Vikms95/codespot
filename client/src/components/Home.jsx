import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import Post from './Post'

function Home () {
  const [posts, setPosts] = useState([])

  useAuth()

  useEffect(() => {
    fetch('/api/posts', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(postsData => setPosts(postsData))
  }, [])

  return (
    <section>
      {posts.map(({ _id, user, title, text, private: isPrivate }) => (
        <Post
          key={_id}
          user={user}
          title={title}
          text={text}
          isPrivate={isPrivate}
        >
        </Post>
      ))}
    </section>
    // Here is where an array of the fetched post data will be rendered
  )
}

export default Home
