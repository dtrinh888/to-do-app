angular.module('toDoApp', [])
	.controller('toDoCtrl', function($scope){
		//set $scope variables
		$scope.tasks = [];
		$scope.deletedTasks = [];
		$scope.submitTask = function(){
			$scope.tasks.unshift($scope.enteredTask); 
			$scope.enteredTask = '';
		};
		$scope.removeTask = function(task) {
			var i = $scope.tasks.indexOf(task);
			$scope.tasks.splice(i, 1);
		};
	})
	.factory('toDoFactory', ['$http', function($http){
		//function to submit task
		return function(newTask) {

		};
		//function to complete task
		//function to remove task
		//function to reset task
	}])
	.directive('toDo', function(){
		return {
			templateUrl: 'to-do.html',
			restrict: 'E',
			transclude: false,
			scope: true
		};
	});
