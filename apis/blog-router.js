const express = require("express");
const helpers = require("../data/db");

// instantiating a piece of express app
const router = express.Router();
// invoke .get etc on the router we just created
// THE DIFFERENT WAYS SERVER CAN RESPOND TO CLIENT
// res.json()
// res.send()
// res.end() // no body in the response

// | GET    | /api/posts              | Returns an array of all the post objects contained in the database.
router.get("/api/posts", async (req, res) => {
  const posts = await helpers.find();

  res.status(200).json({ posts });
});
// | GET    | /api/posts/:id          | Returns the post object with the specified id.
router.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  helpers
    .findById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "No post with id " + id });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
    });
});
// POST   | /api/posts              | Creates a post using the information sent inside the `request 
// function insert(post) {
//   return db('posts')
//     .insert(post, 'id')
//     .then(ids => ({ id: ids[0] }));
// }
router.post("/api/posts", async (req, res) => {
  const payload = req.body;
  helpers
    .insert(payload)
    .then(post => {
      if (!post) {
        res
          .staus(400)
          .json({ errorMessage: "Please provide title and contents for the user." });
      } else {
        res.status(200).json(payload);
      }
    })
    .catch(error => {
      console.log("hi",error);
    });
});
//  DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  helpers
    .remove(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(204).json({ message: "Removed " });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

// | GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.

// router.get("/api/posts/:id/comments", async (req, res) => {
// function findPostComments(postId) {
//   return db('comments')
//     .join('posts', 'posts.id', 'post_id')
//     .select('comments.*', 'title as post')
//     .where('post_id', postId);
// }
//   const { postId } = req.params;
//   const comments = await helpers.findPostComments();
//   helpers
//     .findPostComments(postId)
//     .then(post => {
//       if (!post) {
//         res
//           .status(404)
//           .json({ message: "No comments associated with that post id " });
//       } else {
//         res.status(200).json(comments);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// | POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.

module.exports = router;
