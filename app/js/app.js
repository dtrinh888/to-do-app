angular.module('toDoApp', [])
	.controller('toDoCtrl', function($scope){
		//set $scope variables
		$scope.tasks = [];
		$scope.submitTask = function(){
			$scope.tasks.unshift($scope.enteredTask); 
			$scope.enteredTask = '';
		};
	})
	.factory('toDoFactory', function(){
		//function to submit task

		//function to complete task
		//function to remove task
		//function to reset task
	})
	.directive('toDo', function(){
		return {
			templateUrl: 'to-do.html',
			restrict: 'E',
			transclude: false,
			scope: true
		};
	});
