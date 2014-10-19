var tabGroup = Ti.UI.createTabGroup();

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Profiles',
    window:profiles
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Create Profile',
    window:createProfiles
});

var tableData = Ti.UI.createTableView({
	backgroundColor: "#fff",
});


var profilesTable = function(profilesData){
	var dataTable = [];
	for (i in profilesData){
		var row = Ti.UI.createTableViewRow({
			id: profilesData[i].id,
			height: 60,
		});
		var view = Ti.UI.createView({
		});
		
		var nameLabel = Ti.UI.createLabel({
			text: profilesData[i].name,
			font: {fontSize: 18, fontFamily: "Helvetica", fontWeight: "light"},
			left: 15,
		});
		
		var userNameLabel = Ti.UI.createLabel({
			text: profilesData[i].userName,
			font: {fontSize: 18, fontFamily: "Helvetica", fontWeight: "light"},
		});
		
		var ageLabel = Ti.UI.createLabel({
			text: profilesData[i].age,
			font: {fontSize: 18, fontFamily: "Helvetica", fontWeight: "light"},
			right: 20,
		});
		
		view.add(nameLabel, userNameLabel, ageLabel);
		row.add(view);
		dataTable.push(row);
	};
	tableData.setData(dataTable);
};


var userPage = Ti.UI.createScrollView({
	contentWidth: "auto",
	contentHeight: "auto",
	showVerticalScrollIndicator: true,
	height: "100%",
	width: "100%"
});

var createAccount = Ti.UI.createLabel({
	text: "Create Username",
	color: "#01b4ff",
	top: 25,
	font: {fontSize: 36, fontFamily: "Helvetica", fontWeight: "light"},
});
	
var name = Titanium.UI.createTextField({
	color: "#01b4ff",
	top: 90,
	height:50,
	width:"240",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText:"name", 
});

var userName = Titanium.UI.createTextField({
	color: "#01b4ff",
	top: 150,
	height:50,
	width:"240",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText:"username", 
});
	
var age = Titanium.UI.createTextField({
	color: "#01b4ff",
	top: 210,
	height:50,
	width:"240",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	keyboardType:  Titanium.UI.KEYBOARD_NUMBER_PAD,
	hintText:"age", 
});

var submitButton = Ti.UI.createView({
	backgroundColor: "#fff",
	borderRadius: 5,
	height: 60,
	width: 130,
	top: 290,
});

var submitLabel = Ti.UI.createLabel({
	text: "Submit",
	color: "#023348",
	font: {fontSize: 28, fontFamily: "Helvetica", fontWeight: "light"},
});

submitButton.add(submitLabel);
userPage.add(name, userName, age, createAccount, submitButton);	

tableData.addEventListener("click", function(event){
});

submitButton.addEventListener("click", function(e){
	if (name.value != 0 && userName.value != 0 && age.value !=0){
		data.create(name.value,userName.value, age.value);
		data.read();
		name.value = "";
		userName.value = "";
		age.value = "";
	}else{
		alert("Please complete all forms");
	}
	
});

profiles.add(tableData);
profilesTable();
exports.tableData = tableData;
exports.profilesTable = profilesTable;
createProfiles.add(userPage);

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

tabGroup.open();

exports.tab1 = tab1;
exports.tab2 = tab2;
exports.tabGroup =tabGroup;
