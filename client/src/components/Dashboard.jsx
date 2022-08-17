import React, { useEffect, useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Post from './Post'

function Dashboard () {
  const { user } = useContext(AuthContext)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`/api/${user}/posts`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(postsData => setPosts(postsData))
      // Would only fetching the posts when the user changes not update the posts info on the client-side?
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

export default Dashboard
