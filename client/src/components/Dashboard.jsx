import React, { useState, useEffect } from 'react'

function Dashboard () {
  const [isAllowed, setIsAllowed] = useState(false)
  useEffect(() => {
    fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(response => (response.status === 200)
      ? setIsAllowed(true)
      : setIsAllowed(false)
    )
  }, [])

  return (
    (isAllowed
      ? <div>Here you have your posts</div>
      : <div>Not allowed</div>)

  )
}

export default Dashboard
