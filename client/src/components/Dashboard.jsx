import React, { useEffect, useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Modal from './Modal'
import ModalContainer from '../containers/ModalContainer'
import Post from './Post'

function Dashboard () {
  const { user } = useContext(AuthContext)

  const [posts, setPosts] = useState([])
  const [isModalActive, setIsModalActive] = useState(false)

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
    <section className='dashboard-container'>
      <ModalContainer isModalActive={isModalActive}>
        <Modal/>
      </ModalContainer>

      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          user={post.user}
          title={post.title}
          text={post.text}
          isPrivate={post.private}
          setIsModalActive={setIsModalActive}
        >
        </Post>
      ))}
    </section>
    // Here is where an array of the fetched post data will be rendered
  )
}

export default Dashboard
