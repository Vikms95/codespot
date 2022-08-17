import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import verifyUser from '../services/verifyUser'
import Post from './Post'

function Home () {
  const [posts, setPosts] = useState([])

  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    fetch('/api/posts', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(postsData => setPosts(postsData))
  }, [])

  useEffect(() => {
    verifyUser()
      .then(authResult => {
        setUser(authResult.user)
      })
  }, [])

  return (
    <section>
      {posts.map(({ user, title, text, private: isPrivate }) => (
        <Post
          key={ title + text}
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
