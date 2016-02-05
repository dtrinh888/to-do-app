angular.module('toDoApp', [])
	.controller('toDoCtrl', function($scope, toDoFactory){
		//set $scope variables
		$scope.tasks = toDoFactory.tasks;
		$scope.submitTask = function(){
			toDoFactory.submitTask($scope.enteredTask); 
			$scope.enteredTask = '';
		};
		$scope.removeTask = toDoFactory.removeTask;
	})
	.factory('toDoFactory', ['$http', function($http){
		//function to submit task
		var toDo = {
			tasks: [],
			enteredTask: '',
			submitTask: function(task){
				toDo.tasks.unshift(task);
			},
			removeTask: function(task) {
				var i = toDo.tasks.indexOf(task);
				toDo.tasks.splice(i, 1);
			}
		};
		//function to complete task
		//function to remove task
		//function to reset task
		return toDo;
	}])
	.directive('toDo', function(){
		return {
			templateUrl: 'to-do.html',
			restrict: 'E',
			transclude: false,
			scope: true
		};
	});
