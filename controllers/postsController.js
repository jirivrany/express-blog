const Post = require('../models/post');
const utils = require('../utils');

exports.newPostEditor = function(req, res, next) {
    res.render('editor.html')
};


exports.saveNewPost = function(req, res, next) {
    new Post({
        title: req.body.title,
        permalink: req.body.permalink,
        maintext: req.body.maintext
    }).save(function(err, mPost) {
        if (err) {
            return next(err);
        } else {
            return res.redirect('/');
        }
    });
};


exports.existingPostEditor = function(req, res, next) {
    let query = { "_id": req.params.id };
    Post.findOne(query, function(err, mPost) {
        res.render('editor.html', {
            post: mPost
        });
    });
};


exports.savePostChanges = function(req, res, next) {
    let query = { "_id": req.params.id };
    let update = {
        title: req.body.title,
        permalink: req.body.permalink,
        maintext: req.body.maintext
    }
    let options = { new: false };
    Post.findOneAndUpdate(query, update, options, function(err, mPost) {
        res.redirect('/');
    });
};


exports.deletePost = function(req, res, next) {
    let query = { "_id": req.params.id };
    Post.findOneAndRemove(query, function(err, mPost) {
        res.redirect('/');
    });
};


exports.getPost = function(req, res, next) {
    let query = { "permalink": req.params.permalink };
    Post.findOne(query, function(err, mPost) {
        res.render('post.html', {
            title: mPost.title,
            maintext: mPost.maintext,
            id: mPost._id
        });
    });
}


exports.getPostsForHomePage = function(req, res, next) {

    Post.find(function(err, mPosts) {

        res.render('index.html', {
            big_title: mPosts[0].title,
            big_perex: utils.firstNWords(20, mPosts[0].maintext),
            big_permalink: '/posts/view/' + mPosts[0].permalink,
            posts: mPosts.slice(1)
        });
    });



}