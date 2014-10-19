

Ti.Database.install("users.sqlite", "users4");

var create = function(name,userName,age, account){
	var db = Ti.Database.open("users4");
	db.execute('INSERT INTO users (name, userName, age, account) VALUES(?,?,?,?)', name, userName,age, account);
	var rowID = db.lastInsertRowId;
	db.close();
};

exports.create = create;

var playerName = [];

var read = function(){
var db = Ti.Database.open("users4");
	var dbRows = db.execute("SELECT id, name, userName, age, account FROM users");
	while (dbRows.isValidRow()) {
		playerName.push({
			name: dbRows.fieldByName("name"),
			userName: dbRows.fieldByName("userName"),
			age: dbRows.fieldByName("age"),
			account: dbRows.fieldByName("account"),
		});
		dbRows.next();
	}
	dbRows.close();
	db.close();
	
};
exports.playerName = playerName;
exports.read = read;
