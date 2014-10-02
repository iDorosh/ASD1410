Titanium.UI.setBackgroundColor("#000");

var mainWindow = Ti.UI.createWindow({
	backgroundColor: "#6c6c6c",
	title: "Cars"
});
//check
var loadFile = require("cars");

mainWindow.open();