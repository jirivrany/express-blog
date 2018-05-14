const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/adduser', function(req, res, next) {
    
    res.setHeader('Content-Type', 'application/json');
                

    if (req.body.username && req.body.password ) {
        var userData = {
            username: req.body.username,
            password: req.body.password,
        }
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                res.send(JSON.stringify({error: "failed to create user in db"}));
            } else {
                res.send(JSON.stringify({sucess: "user created", user: userData}));
            }
        });
    }
    else {
        res.send(JSON.stringify({error: "missing username or password"}));
    }

});

module.exports = router;