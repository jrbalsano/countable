var mongoose = require('mongoose');

var GoalSchema = new mongoose.Schema({
    title: String,
    completed: { type: Number, default: 0},
    total: Number
});

GoalSchema.methods.increment = function(cb) {
    var newVal = this.completed + 1;
    if (newVal <= this.total) {
        this.completed += 1;
        this.save(cb);
    }
    cb(null, this);
};

mongoose.model('Goal', GoalSchema);
