const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postsController');

router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.get('/add', post_controller.newPostEditor);

router.post('/add', post_controller.saveNewPost);

router.get('/edit/:id', post_controller.existingPostEditor);

router.post('/edit/:id', post_controller.savePostChanges);

router.get('/delete/:id', post_controller.deletePost);

router.get('/view/:permalink', post_controller.getPost);

module.exports = router;