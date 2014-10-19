var ui = require("ui");


Ti.Database.install("users.sqlite", "profiles");


var create = function(name,userName, age){
	var db = Ti.Database.open("profiles");
	db.execute('INSERT INTO users (name, userName, age) VALUES(?,?,?)', name, userName, age);
	var rowID = db.lastInsertRowId;
	db.close();
	tblData = [];
	tabGroup.setActiveTab(0);
};
exports.create = create;


var tblData = [];
var read = function(){
var db = Ti.Database.open("profiles");
	var dbRows = db.execute("SELECT id, name, userName, age FROM users");
	while (dbRows.isValidRow()) {
		tblData.push({
			id: dbRows.fieldByName("id"),
			name: dbRows.fieldByName("name"),
			userName: dbRows.fieldByName("userName"),
			age: dbRows.fieldByName("age"),
		});
		dbRows.next();
	}
	dbRows.close();
	db.close();
	ui.profilesTable(tblData);
	
};
exports.read = read;

var update = function(index, location){
	var db = Ti.Database.open("profiles");
	db.execute("UPDATE users SET name=?, userName=?", ui.nameField.value,ui.userNameField.value, ui.button.id);
	db.close;
	tblData = [];
	read();
};
exports.update = update;

var del = function(id){
	var db = Ti.Database.open("profiles");
	db.execute("DELETE FROM users WHERE id=?", id);
	db.close();
	tblData = [];
	read();
};
exports.del = del;