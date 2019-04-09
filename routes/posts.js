const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const auth = require('../auth');



router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.get('/add', auth.requiresLogin, postController.newPostEditor);

router.post('/add', auth.requiresLogin, postController.saveNewPost);

router.get('/edit/:id', auth.requiresLogin, postController.existingPostEditor);

router.post('/edit/:id', auth.requiresLogin, postController.savePostChanges);

router.get('/delete/:id', auth.requiresLogin, postController.deletePost);

router.get('/view/:permalink', postController.getPost);

module.exports = router;