const express = require('express')

const app = express()
  .listen(process.env.PORT || 6060, () => {
    console.log(`Express running on port ${app.address().port}`)
  })
