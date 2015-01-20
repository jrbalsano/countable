var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goal = mongoose.model('Goal');

router.get('/posts', function(req, res, next) {
    Goal.find(function(err, posts) {
        if (err) { return next(err); }

        res.json(posts);
    });
});

router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});

model.exports = router;
