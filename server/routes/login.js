const express = require('express')
const router = express.Router()

// research of user on db and authentication whenever a POST method is triggered on /login
router.post('/login', (req, res, next) => {
  res.send('Hi')
})

module.exports = router
