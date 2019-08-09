const express = require('express');

const DbRouter = require('./db-router.js');


const server = express();

server.use(express.json());
server.use('/api/db', DbRouter)

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Database API</h>
    <p>Welcome to the Lambda Database API</p>
  `);
});



module.exports = server;