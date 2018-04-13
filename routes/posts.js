const express = require('express');
const router = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.get('/add', function(req, res, next) {
    res.render('editor.html')
});


router.post('/add', function(req, res, next) {
    console.log(req.body.title);
    new Post({
        title: req.body.title,
        permalink: req.body.permalink,
        maintext: req.body.maintext
    }).save(function(err, mPost) {
        console.log(mPost)
        res.redirect('/');
    });

});


router.get('/edit/:id', function(req, res, next) {
    let query = { "_id": req.params.id };
    Post.findOne(query, function(err, mPost) {
        res.render('editor.html', { 
            post: mPost
        });     
    });
    
});

router.post('/edit/:id', function(req, res, next) {
    let query = { "_id": req.params.id };
    let update = {
        title: req.body.title,
        permalink: req.body.permalink,
        maintext: req.body.maintext
    }
    let options = {new: false};
    Post.findOneAndUpdate(query, update, options, function(err, mPost) {
        res.redirect('/');
    });
    
});


router.get('/delete/:id', function(req, res, next) {
    let query = { "_id": req.params.id };
    Post.findOneAndRemove(query, function(err, mPost) {
       res.redirect('/'); 
    });
    
});


router.get('/view/:permalink', function(req, res, next) {
    let query = { "permalink": req.params.permalink };
    Post.findOne(query, function(err, mPost) {
        res.render('post.html', { 
            title: mPost.title,
            maintext: mPost.maintext,
            id: mPost._id
        });     
    });
    
});





module.exports = router;