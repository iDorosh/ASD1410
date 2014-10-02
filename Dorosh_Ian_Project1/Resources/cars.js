//Loads data from data.js
var loadFile = require("data");

loadFile.sportsCars;
loadFile.familyCars;

//Table View
var cars = Ti.UI.createTableView({
});

//Sets style to Grouped
if(Ti.Platform.name === "iPhone OS"){
	cars.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
};

//Sets Headers
var sportsCarsSection = Ti.UI.createTableViewSection({
	headerTitle: "Sports Cars",
});
	
var familyCarsSection = Ti.UI.createTableViewSection({
	headerTitle: "Family Cars"
});

//For loop to create rows for literal notation objects
for(var i=0, j=loadFile.sportsCars.length; i<j; i++){
	var row = Ti.UI.createTableViewRow({
		title: loadFile.sportsCars[i].brand+ " " +loadFile.sportsCars[i].model,
		price: loadFile.sportsCars[i].moneyLeft,
	});
	
	sportsCarsSection.add(row);
	//Using event propagation this click event listener runs the price functions in my literal notation objects
	row.addEventListener("click", function(event){
		(event.source.price());
	});
		
};

//For loop to create rows for dot notation objects
for(var i=0, j=loadFile.familyCars.length; i<j; i++){
	var row = Ti.UI.createTableViewRow({
		title: loadFile.familyCars[i].brand+ " " +loadFile.familyCars[i].model,
		price: loadFile.familyCars[i].moneyLeft,
	});
		
	familyCarsSection.add(row);
	//Using event propagation this click event listener runs the price functions in my dot notation objects
	row.addEventListener("click", function(event){
		(event.source.price());
	});
};

	

var carsSections = [sportsCarsSection, familyCarsSection ];

//Puts all data into tableView
cars.setData(carsSections);

//Exports mainWindow to app.js
exports.mainWindow = mainWindow.add(cars);
