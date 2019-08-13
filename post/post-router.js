const router = require('express').Router();
const Posts = require('../data/db.js');


// GET Request /
router.get('/', (req, res) => {
    Posts.find()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: "The posts information could not be retrieved."
            });
        });
    });

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    Posts.findById(postId)
        .then(post => {
            if (post.length) {
                res.status(200).json(post);
            } else {
                res.status(404).json({  
                    message: "The post with the specified ID does not exist." });
            }
        })
        
        .catch(err => {
            res.status(500).json({ 
                err:err, 
                message: "The post information could not be retrieved." 
            });
        });
});
    
router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    Posts.findPostComments(postId)
        .then(comments => {
            if (comments.length) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: "The comments information could not be retrieved."
            });
        });
});

// Post Request /
router.post('/', (req, res) => {
    const postInfo = req.body;
    if(!postInfo.title || !postInfo.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        });
    } else {
        Posts.insert(postInfo)
        .then(ids => {
            Posts.findById(ids.id).then(post => {
                res.status(201).json(post);
            });
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: "There was an error while saving the post to the database"
            });
        });
    }
});

router.post('/:id/comments', (req, res) => {
    const commentInfo = req.body;
    const postId = req.params.id;
        if (!postId) {
            return res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
        if (commentInfo.text) {
            Posts.insertComment(commentInfo)
                .then(id => {
                    Posts.findCommentById(id.id).then(comment => {
                        res.status(201).json(comment);
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        err:err,
                        errorMessage: "There was an error while saving the comment to the database"
                    });
                });
        }
});

//DELETE /
router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    Posts.remove(postId)
        .then(post => {
            if (post) {
                res.status(200).json({
                    message: "Post deleted!" 
                });
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                errorMessage: "The post could not be removed"
            });
        });
});

// PUT /
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updated = req.body;
    if (!id) {
        return res.status(400).json({
            message:"Include id with your request"
        })
    }
    Posts.findById(id).then(findPost => {
        if (findPost.length) {
            Posts.update(id, updated).then(updates => {
                Posts.findById(id)
                    .then(post => {
                        if (!post[0].title || !post[0].contents) {
                            res.status(400).json({
                                errorMessage: "Please provide title and contents for the post."
                            })
                        } else {
                            res.status(200).json(post);
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            err:err,
                            error: "The post information could not be modified."
                        })
                    })
            })
        }
    })
})

module.exports = router;