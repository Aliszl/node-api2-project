const express = require('express')
const helpers = require("../data/db");

// instantiating a piece of express app
const router = express.Router()


// invoke .get etc on the router we just created
router.get('/api/posts', async(req, res) => {
  const posts = await helpers.find();
  // THE DIFFERENT WAYS SERVER CAN RESPOND TO CLIENT
  // res.json()
  // res.send()
  // res.end() // no body in the response
  res.status(200).json({posts})
})



module.exports = router

