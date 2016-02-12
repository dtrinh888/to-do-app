//describe to do app's function tests
describe('test to-do functions', function(){
	//need to create variable for path of app
	var ROOT = "http://localhost:8080/app";
	//create function to simiulate input entries and clicks
	//pass in task
	createEntry = function(task){
		//get path of app
		browser.get(ROOT + "/");
		//find the element by the model, whatever is set to ng-model, 
		//in this instance it is 'task.selected'
		//.sendKeys() is what user types into input and pass the task 
		//into the sendKeys() method
		element(by.model('task.selected')).sendKeys(task);
		//return function of remove button identified by the button's css class
		return element(by.css('.sub-btn')).click();
	};
	//create test that shows the correct amount of tasks after remove button 
	//is clicked
	it('should have appropriate amount of tasks', function(){
		createEntry("TASK 1");
		/*browser.get(ROOT + "/");*/
		expect(element(by.css('.rmv-btn')).click()).toBe(0);
	});
});