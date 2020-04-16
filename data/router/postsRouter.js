const express = require('express')

const db = require('../db')

const router = express.Router()

// GET POSTS
router.get('/', (req, res) => {
  db.find()
    .then(posts => { // SUCCESS
      res.status(200).json(posts)
    })
    .catch(err => { // can't find posts
      console.log(err)
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

// GET POST BY ID
router.get('/:postId', (req, res) => { // HALF CAKE
  db.findById(req.params.postId)
    .then(post => {
      if (post.length) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

// GET COMMENTS BY POST ID
router.get('/:postId/comments', (req, res) => { // CAKE

  const requestedPost = db.findById(req.params.postId) //check if post exists

  if (requestedPost.length) {
    db.findPostComments(req.params.postId) //grab comments
      .then(comments => { // SUCCESS
        res.status(200).json({comments})
      })
      .catch(err => { // finding comments fails
        res.status(500).json({ error: "The comments information could not be retrieved." })
      })

  } else {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  }
})


// ADD A POST
router.post('/', (req, res) => { // CAKE
  const newPost = req.body

  if (newPost.title && newPost.contents) {
    db.insert(newPost)
      .then(() => { // SUCCESS
        res.status(201).json(newPost)
      })
      .catch(err => { // saving post failed
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
      })
  } else { // info missing
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
})

// ADD A COMMENT
router.post('/:postId/comments', (req, res) => {
  const newComment = {title: req.body.title, post_id: req.params.postId}

  if (newComment.title) {
    const requestedPost = db.findById(newComment.post_id)
    
    if (requestedPost.length) {
      db.insertComment(newComment)
        .then(() => { // SUCCESS
          res.status(201).json(newComment)
        })
        .catch(err => {
          res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    } else { // post not found
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  } else { // missing info
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
  }
})

// UPDATE POST BY ID
router.put('/:postId', (req, res) => {
  const newPostInfo = req.body // set new post info

  if (newPostInfo.title && newPostInfo.contents) { // check for required info
    
    const requestedPost = db.findById(req.params.postId) // grab post

    if (requestedPost.length) {
      db.update(req.params.postId, req.body)
      .then(() => { // SUCCESS
        res.status(200).json(newPostInfo)
      })
      .catch(err => { // if update fails
        console.log(err)
        res.status(500).json({ error: "The post information could not be modified." })
      })
    } else { // post id isn't valid
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

  } else { // post missing info
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
})


// DELETE POST BY ID
router.delete('/:postId', (req, res) => { // CAKE
  const postToDelete = db.findById(req.params.postId) // grab relevant post

  if (postToDelete.length) {
    db.remove(req.params.postId)
      .then(removedPost => { // SUCCESS
        res.sendStatus(204)  
      })
      .catch(err => { // if removing post fails
        res.status(500).json({ error: "The post could not be removed" })
      })
  } else { // if post isn't found
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  }
})

// TO DO
//-post a comment to an id


module.exports = router