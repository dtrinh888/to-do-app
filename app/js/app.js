angular.module('toDoApp', [])
	.controller('toDoCtrl', function($scope, toDoFactory){
		//set $scope variables
    $scope.todo = toDoFactory;

		$scope.tasks = toDoFactory.tasks;
		$scope.submitTask = function(){
			toDoFactory.submitTask($scope.enteredTask);
			$scope.enteredTask = '';
		};
		$scope.removeTask = toDoFactory.removeTask;
		$scope.clearTasks = toDoFactory.clearTasks;
		$scope.removeTasks = toDoFactory.removeTasks;
		$scope.completeTasks = toDoFactory.completeTasks;

    $scope.masterToggle = toDoFactory.masterToggle;

    // "Watch" all of the tasks, when they change trigger the toggle
    $scope.$watch('tasks', toDoFactory.toggleTask, true);

		// $scope.selectAll = toDoFactory.selectAll;
		// $scope.selectedAll = toDoFactory.selectedAll;


		// $scope.selectAll = function(){
		// 	if ($scope.selectedAll){
		// 		$scope.selectedAll = true;
		// 	} else {
		// 		$scope.selectedAll = false;
		// 	}
		// 	angular.forEach($scope.tasks, function(task){
		// 		task.selected = $scope.selectedAll;
		// 	});
		// };
	})
	.factory('toDoFactory', ['$http', function($http){
		//function to submit task
		var toDo = {
			tasks: [],
			enteredTask: '',
			counter: 1,
			allSelected: false,
      numSelected: 0,
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
			//function to complete task
			completeTasks: function(){
				//loop through the task
				for(var i = 0; i < toDo.tasks.length; i++){
					if(toDo.tasks[i].selected){
						toDo.tasks[i].completed = true;
						toDo.tasks[i].selected = false;
					}
				}
			},
			//function to clear task list
			clearTasks: function(){
				toDo.tasks.length = 0;
			},
			removeTasks: function(){
				console.log(toDo.tasks);
				//loop through tasks
				for(var i = toDo.tasks.length - 1; i >= 0; i--){
					console.log(toDo.tasks[i]);
					//check each task to see if it is selected
					if(toDo.tasks[i].selected){
						//if task is selected remove task
						toDo.tasks.splice(i, 1);
					}
				}
			},
      masterToggle: function() {
        // The "Select All" checkbox chanaged, set the selected status for
        // all of the individual tasks.
        toDo.tasks.forEach(function(task) {
          task.selected = toDo.allSelected;
        });
      },
      toggleTask: function() {
        // Reset counter
        toDo.numSelected = 0;

        // Loop through each of the tasks
        toDo.tasks.forEach(function(task) {
          // Check if the task is selected
          if (task.selected) {
            // If selected, increment counter
            toDo.numSelected++;
          }
        });

        // SEE NOTE BELOW ABOUT DOM MANIPULATION IN CONTROLLER
        angular.element(document.getElementById('master-box')).prop('indeterminate', false);

        if (!toDo.tasks.length) {
          // If there are no tasks, then the master box should be unchecked
          toDo.allSelected = false;
        } else if (toDo.numSelected === toDo.tasks.length) {
          // If the number of selected matches the length, then all the tasks are
          // selected.  Set the `allSelected` flag to true to "check" the master box
          toDo.allSelected = true;
        } else if (toDo.numSelected == 0) {
          // Else, if the selected is 0 then there are no tasks selected so
          // set the `allSelected` flag to false to "uncheck" the master box
          toDo.allSelected = false;
        } else {
          // If we got here, then some of the tasks are selected.  We'll want
          // the master box to be unchecked so set the `allSelected` flag to false
          toDo.allSelected = false;

          // Optionally, there is a neat property we can add to a checkbox that
          // will add a "dash" to the master box if the list is partially selected.
          // IMPORTANT!! Doing DOM manipulation inside of a controller is a no-no.
          // Any DOM manipulation should be done inside a directive.  This code
          // is here simply for demonstration purposes.  If you want to do DOM
          // manipulation like this, then conver the whole list to a directive.
          angular.element(document.getElementById('master-box')).prop('indeterminate', true);
        }
      },
			selectAll: function(){
				// if(toDo.selectedAll) {
				// 	toDo.selectedAll = true;
				// } else {
				// 	toDo.selectedAll = false;
				// }
				// angular.forEach(toDo.tasks, function(task){
				// 	task.selected = toDo.selectedAll;
				// });
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
