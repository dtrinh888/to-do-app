angular.module('toDoApp', [])
	.controller('toDoCtrl', function($scope, toDoFactory){
		//set $scope variables
		$scope.toDo = toDoFactory;
		$scope.tasks = toDoFactory.tasks;
		$scope.completedTasks = toDoFactory.completedTasks;
		$scope.submitTask = function(){
			toDoFactory.submitTask($scope.enteredTask); 
			$scope.enteredTask = '';
		};
		$scope.removeTask = toDoFactory.removeTask;
		$scope.removeCompleteTasks = toDoFactory.removeCompleteTasks;
		$scope.clearTasks = toDoFactory.clearTasks;
		$scope.removeTasks = toDoFactory.removeTasks;
		$scope.completeTasks = toDoFactory.completeTasks;
		$scope.masterToggle = toDoFactory.masterToggle;
		$scope.completedMasterToggle = toDoFactory.completedMasterToggle;
		$scope.completeTask = toDoFactory.completeTask;
		$scope.removeCompletedTask = toDoFactory.removeCompletedTask;
		// "Watch" all of the tasks, whenthey change trigger the toggle
		$scope.$watch('tasks', toDoFactory.toggleTask, true);
		$scope.$watch('completedTasks', toDoFactory.completedToggleTask, true);
	})
	.factory('toDoFactory', ['$http', function($http){
		//function to submit task
		var toDo = {
			tasks: [],
			completedTasks: [],
			enteredTask: '',
			counter: 1,
			selectedAll: false,
			allSelected: false,
			completedAllSelected: false,
			numSelected: 0,
			completeSelected: 0,
			submitTask: function(task){
				toDo.tasks.unshift({text: task, selected: false, id: toDo.counter, completed: false});
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
			removeCompletedTask: function(task) {
				//loop through the task
				for(var i = 0; i < toDo.completedTasks.length; i++){
					//inside loop check if text of task matches			
					if(toDo.completedTasks[i].id == task.id){
						//if text matches mark it to be removed
						toDo.completedTasks.splice(i, 1);
					}
				}			
			},			
			//function to complete task
			completeTasks: function(){
				//loop through the task
				for(var i = toDo.tasks.length-1; i >= 0; i--){
					if(toDo.tasks[i].selected){
						toDo.tasks[i].completed = true;
						toDo.tasks[i].selected = false;
						toDo.completedTasks.push(toDo.tasks.splice(i, 1)[0]);
					} 
					toDo.completedAllSelected = false;
				}
			},
			// function to complete a single task
			completeTask: function(task){
				console.log(task);
				for(var i = 0; i <= toDo.tasks.length; i++){
					if(task.id === toDo.tasks[i].id){
						toDo.tasks[i].completed = true;
						toDo.tasks[i].selected = false;
						toDo.completedTasks.push(toDo.tasks.splice(i, 1)[0]);
					}
				}
			},
			//function to clear task list
			clearTasks: function(){
					toDo.tasks.length = 0;	
					toDo.completedTasks.length = 0;

			},
			removeTasks: function(){
				//loop through tasks
				for(var i = toDo.tasks.length - 1; i >= 0; i--){
					//check each task to see if it is selected
					if(toDo.tasks[i].selected){
						//if task is selected remove task
						toDo.tasks.splice(i, 1);
					}
				}
				for(var j = toDo.completedTasks.length - 1; j >= 0; j--){
					if (toDo.completedTasks[j]){
						toDo.completedTasks.splice(j, 1);
					}
				}
			},
			masterToggle: function(){
				// the "Select All" checkbox changed, set the selected status
				// for all of the individual tasks.
				toDo.tasks.forEach(function(task){
					task.selected = toDo.allSelected;
				});
			},
			toggleTask: function(){
				// reset counter
				toDo.numSelected = 0;

				// loop through each of the tasks
				toDo.tasks.forEach(function(task){
					// check if the task is selected
					if(task.selected) {
						// if selected, increment counter
						toDo.numSelected++;
					}
				});
				angular.element(document.getElementById('master-box')).prop('indeterminate', false);

				// If there are no tasks, then the master box should be unchecked
				if(!toDo.tasks.length) {
					toDo.allSelected = false;

				// If the number of selected matches the length, then all the tasks are
	            // selected.  Set the `allSelected` flag to true to "check" the master box

				} else if(toDo.tasks.length === toDo.numSelected){
	            	toDo.allSelected = true;
	
	            // If we got here, then some of the tasks are selected.  We'll want
  	            // the master box to be unchecked so set the `allSelected` flag to false
	            } else {
	            	toDo.allSelected = false;
	            }
	            // Optionally, there is a neat property we can add to a checkbox that
	            // will add a "dash" to the master box if the list is partially selected.
	            // IMPORTANT!! Doing DOM manipulation inside of a controller is a no-no.
	            // Any DOM manipulation should be done inside a directive.  This code
	            // is here simply for demonstration purposes.  If you want to do DOM
	            // manipulation like this, then conver the whole list to a directive.      
	            
			},
			completedMasterToggle: function(){
				toDo.completedTasks.forEach(function(task){
					task.selected = toDo.completedAllSelected;
				});
			},
			completedToggleTask: function(){
				toDo.completeSelected = 0;

				toDo.completedTasks.forEach(function(task){
					if(task.selected){
						toDo.completeSelected++;
					}
				});
				angular.element(document.getElementById('completed-box')).prop('indeterminate', false);

				if(!toDo.completedTasks.length){
					toDo.completedAllSelected = false;
				} else if (toDo.completedTasks.length === toDo.completeSelected){
					toDo.completedAllSelected = true;
				} else {
					toDo.completedAllSelected =  false;
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
