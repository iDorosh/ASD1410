Titanium.UI.setBackgroundColor("#000");

//Creates Main Window
var mainWindow = Ti.UI.createWindow({
	backgroundColor: "#6c6c6c",
	title: "Cars"
});

//Imports mainWindow.add from cars.js
var loadFile = require("cars");

//Opens Main Window
mainWindow.open();