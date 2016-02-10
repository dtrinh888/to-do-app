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
			counter: 1,
			submitTask: function(task){
				toDo.tasks.unshift({text: task, selected: false, id: toDo.counter});
				toDo.counter++;
			},
			//function to remove task
			removeTask: function(task) {
				//loop through the task
				for(var i = 0; i < toDo.tasks.length; i++){
					//inside loop check if text of task matches			
					if(toDo.tasks[i].id == task.id){
						//if text matches mark it to be removed
						toDo.tasks.splice(i, 1);
					}
				}
			},
			//function to complete task
			completeTask: function(){

			},
			//function to clear task list
			clearTasks: function(){
				toDo.tasks.length = 0;
			},
			removeTasks: function(){
				console.log(toDo.tasks);
				//loop through tasks
				for(var i = 0; i < toDo.tasks.length; i++){
					console.log(toDo.tasks[i]);
					//check each task to see if it is selected
					if(toDo.tasks[i].selected){
						//if task is selected remove task
						toDo.tasks.splice(i, 1);
					}
				}
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
