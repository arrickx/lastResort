const express = require('express');

const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/',
  projectController.test,
  (req, res) => res.status(200).json([...res.locals.data.rows])
);


module.exports = router;