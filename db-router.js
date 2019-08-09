const express = require('express');

const Db = require('./db-model.js');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const db = await Db.find(req.query);
      res.status(200).json(db);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    }
  });

module.exports = router;