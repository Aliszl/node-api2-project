const express = require('express')
const helpers = require("../data/db");

// instantiating a piece of express app
const router = express.Router();
// invoke .get etc on the router we just created
 // THE DIFFERENT WAYS SERVER CAN RESPOND TO CLIENT
  // res.json()
  // res.send()
  // res.end() // no body in the response

// | GET    | /api/posts              | Returns an array of all the post objects contained in the database.     
router.get('/api/posts', async(req, res) => {
  const posts = await helpers.find();
 
  res.status(200).json({posts})
})
// | GET    | /api/posts/:id          | Returns the post object with the specified id.
router.get('/api/posts/:id', async(req, res) => {
  const { id } = req.params;
  helpers
  .findById(id)
  .then(post =>{
    if (!post){
      res.status(404).json({ message: "No post with id " + id });
    }else{
      res.status(200).json(post);
    }
  })
  .catch(error => {
    console.log(error);
  });

})

// | GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.    

// | POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.  




module.exports = router

