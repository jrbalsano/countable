var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goal = mongoose.model('Goal');

router.get('/', function(req, res, next) {
    Goal.find(function(err, posts) {
        if (err) { return next(err); }

        res.json(posts);
    });
});

router.post('/', function(req, res, next) {
    var goal = new Goal(req.body);

    goal.save(function(err, post) {
        if (err) { return next(err); }

        res.json(goal);
    });
});

router.param('goal', function(req, res, next, id) {
    var query = Goal.findById(id);

    query.exec(function (err, goal) {
        if (err) { return next(err); }
        if (!goal) { return next(new Error("can't find goal")); }

        req.goal = goal;
        return next();
    });
});

router.get('/:goal', function(req, res) {
    res.json(req.goal);
});

router.put('/:goal/increment', function(req, res, next) {
    req.goal.increment(function(err, goal) {
        if (err) { return next(err); }

        res.json(goal);
    });
});

module.exports = router;
