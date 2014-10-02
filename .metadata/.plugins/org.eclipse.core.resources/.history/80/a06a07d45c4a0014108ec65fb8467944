var loadFile = require("data");

loadFile.sportsCars;
loadFile.familyCars;

var cars = Ti.UI.createTableView({
});

if(Ti.Platform.name === "iPhone OS"){
	cars.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
};

var sportsCarsSection = Ti.UI.createTableViewSection({
	headerTitle: "Sports Cars",
});
	
var familyCarsSection = Ti.UI.createTableViewSection({
	headerTitle: "Family Cars"
});


for(var i=0, j=loadFile.sportsCars.length; i<j; i++){
	var row = Ti.UI.createTableViewRow({
		title: loadFile.sportsCars[i].brand+ " " +loadFile.sportsCars[i].model,
		price: loadFile.sportsCars[i].moneyLeft,
	});
	
	sportsCarsSection.add(row);
	
	row.addEventListener("click", function(event){
		(event.source.price());
	});
		
};


for(var i=0, j=loadFile.familyCars.length; i<j; i++){
	var row = Ti.UI.createTableViewRow({
		title: loadFile.familyCars[i].brand+ " " +loadFile.familyCars[i].model,
		price: loadFile.familyCars[i].moneyLeft,
	});
		
	familyCarsSection.add(row);
	
	row.addEventListener("click", function(event){
		(event.source.price());
	});
};

	

var carsSections = [sportsCarsSection, familyCarsSection ];

cars.setData(carsSections);
exports.mainWindow = mainWindow.add(cars);
