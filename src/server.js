// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should the send back jsonData on a GET /data
const fs = require('fs')
const path = require('path')
const express = require('express')

// JSON data default
const jsonData = {
  count: 12,
  message: 'Hey, there!',
}

const app = express()

// declare PORT
const PORT = 3001

app.get('/', (req, res) => {
  res.sendfile(path.dirname + '/public/index.html', err => {
    if (err) res.status(500).send(err)
  })
})

app.get('/data', (req, res) => {
  res.json()
})

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`))
