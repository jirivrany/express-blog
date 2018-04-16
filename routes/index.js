const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postsController');

/* GET home page. */
router.get('/', post_controller.getPostsForHomePage);


module.exports = router;
