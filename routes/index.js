const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const utils = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {

    Post.find(function(err, mPosts) {
        


        res.render('index.html', { 
            big_title: mPosts[0].title,
            big_perex: utils.firstNWords(20, mPosts[0].maintext),
            big_permalink: '/posts/view/' + mPosts[0].permalink,
            posts: mPosts.slice(1)        
        });
    });


    
});


module.exports = router;
