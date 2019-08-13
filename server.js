const express = require('express');

const Posts = require('./post/post-router.js');


const server = express();

server.use(express.json());
server.use('/api/posts', Posts)


server.get('/', (req, res) => {
  res.send(`<h2>Lambda Database API</h2>`);
});



module.exports = server;