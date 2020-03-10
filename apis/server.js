// import express app and cors
const express = require('express')
const cors = require('cors')
const blogRouter = require('./blog-router')

// instantiate the app
const app = express()

// configure app so responses
// carry special headers to enable CORS
app.use(cors())
// by default express cannot parse bodies of requests
// we need to opt-in to body-parsing
// and this comes with express
app.use(express.json())

// we connect the router using .use
app.use(blogRouter)

app.get('/hello', (req, res) => {
  const { pal } = req.query
  res.send(`<h1>Hello, ${pal + pal}</h1>`)
})

// kind of like "export default app"
module.exports = app
