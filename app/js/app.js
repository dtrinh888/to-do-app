angular.module('toDoApp', [])
	.controller('toDoCtrl', function($scope){
		//set $scope variables
		$scope.task = '';
		$scope.submitTask = function(){
			if($scope.task){

			}
		};
		console.log('a',$scope.task);
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
