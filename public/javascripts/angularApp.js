var CG = angular.module('countableGoals', ['ui.router']);
CG.controller('GoalController', ['goals', function(goals) {
    this.goals = goals.goals
    this.newGoal = {completed: 0};
    this.addGoal = function() {
        if (!this.newGoal.title || !this.newGoal.total) { return; }
        goals.create(this.newGoal);
        this.newGoal = {completed: 0};
    };
}]);

CG.factory('goals', ['$http', function($http) {
    var o = {
        goals: [
            {title: 'eat', completed: 0, total: 5},
            {title: 'sleep', completed: 2, total: 3},
            {title: 'code', completed: 3, total: 3}
        ],
        getAll: function() {
            return $http.get('/goals').success(function(data) {
                angular.copy(data, o.goals);
            });
        },
        create: function(goal) {
            return $http.post('/goals', goal).success(function(data) {
                o.goals.push(data);
            });
        },
    };
    return o;
}]);

CG.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'GoalController as goalCtrl',
        resolve: {
            goalPromise: ['goals', function(goals) {
                return goals.getAll();
            }]
        }
    });

    $urlRouterProvider.otherwise('home');

}]);
