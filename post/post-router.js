const router = require('express').Router();
const Posts = require('../data/db.js');





router.get('/', (req, res) => {
    Posts.find()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({
                err: "The posts information could not be retrieved."
            });
        });
    });

module.exports = router;