import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import Post from './Post'

function Home () {
  const [posts, setPosts] = useState([])

  useAuth()

  useEffect(() => {
    fetch('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(postsData => setPosts(postsData))
  }, [])

  return (
    <section>
      {posts.map(({ user, title, text, private: isPrivate }) => (
        <Post
          key={user._id}
          id={user._id}
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
