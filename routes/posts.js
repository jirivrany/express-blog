const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postsController');
const auth = require('../auth');



router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.get('/add', auth.requiresLogin, post_controller.newPostEditor);

router.post('/add', auth.requiresLogin, post_controller.saveNewPost);

router.get('/edit/:id', auth.requiresLogin, post_controller.existingPostEditor);

router.post('/edit/:id', auth.requiresLogin, post_controller.savePostChanges);

router.get('/delete/:id', auth.requiresLogin, post_controller.deletePost);

router.get('/view/:permalink', post_controller.getPost);

module.exports = router;