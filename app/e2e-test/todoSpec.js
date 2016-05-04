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
		//in this instance it is 'enteredTask'
		//.sendKeys() is what user types into input and pass the task 
		//into the sendKeys() method
		element(by.model('enteredTask')).sendKeys(task);
		//return function of remove button identified by the button's css class
		return element(by.css('.sub-btn')).click();
	};
	rmvBtn = function(){
		return element(by.css('.rmv-btn')).click();
	};
	compBtn = function(){
		return element(by.css('.comp-btn')).click();
	};
	/*createCompEntry = function(task){
		browser.get(ROOT + "/");
		element(by.model)
	}*/
	//create test that shows the correct amount of tasks after remove button 
	//is clicked
	it('should not show task container', function(){
		browser.get(ROOT +"/");
		expect(element.all(by.css('.uncomplete')).count()).toBe(0);
	});
	it('should have appropriate amount of tasks', function(){
		createEntry("TASK 1");
		expect(element.all(by.css('.uncomplete')).count()).toBe(1);
		expect(element(by.css('.rmv-btn')).click()).toBe(null);
	});
	it('should have appropriate amount of tasks', function(){
		createEntry("TASK 1");
		/*return element(by.css('.rmv-btn')).click();*/
		rmvBtn();
		expect(element.all(by.css('.uncomplete')).count()).toBe(0);
	});	
	fit('should have 1 .complete', function(){
		createEntry('task');
		compBtn();
		expect(element.all(by.css('.complete')).count()).toBe(1);
	});
});