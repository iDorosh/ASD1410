Titanium.UI.setBackgroundColor("#000");

var mainWindow = Ti.UI.createWindow({
	backgroundColor: "#6c6c6c",
	title: "Cars"
});

var loadFile = require("cars");

mainWindow.open();