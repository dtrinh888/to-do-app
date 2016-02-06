angular.module('toDoApp', [])
	.controller('toDoCtrl', function($scope, toDoFactory){
		//set $scope variables
		$scope.tasks = toDoFactory.tasks;
		$scope.submitTask = function(){
			toDoFactory.submitTask($scope.enteredTask); 
			$scope.enteredTask = '';
		};
		$scope.removeTask = toDoFactory.removeTask;
		$scope.clearTasks = toDoFactory.clearTasks;
		$scope.removeTasks = toDoFactory.removeTasks;
	})
	.factory('toDoFactory', ['$http', function($http){
		//function to submit task
		var toDo = {
			tasks: [],
			enteredTask: '',
			submitTask: function(task){
				toDo.tasks.unshift(task);
			},
			//function to remove task
			removeTask: function(task) {
				var i = toDo.tasks.indexOf(task);
				toDo.tasks.splice(i, 1);
			},
			//function to complete task
			completeTask: function(){

			},
			//function to clear task list
			clearTasks: function(){
				toDo.tasks.length = 0;
			},
			removeTasks: function(){
				angular.forEach(toDo.tasks, function(task, index){
					if(task.selected) {
						toDo.tasks.splice(index, 1);	
					}
				});
			}
		};	
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
