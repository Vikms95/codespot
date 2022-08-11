import React, { useEffect } from 'react'

function Dashboard () {
  useEffect(() => {
    fetch('http://localhost:4000/dashboard', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(response => response.json())
      .then(data => console.log(data))
  }, [])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
