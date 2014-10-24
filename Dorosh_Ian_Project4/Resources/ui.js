var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;
var rowCount = 2;
var margin = 10;
var trueCanvasWidth = pWidth-margin;
var size = trueCanvasWidth/rowCount-margin;

//Creates Main Window
var win = Ti.UI.createWindow({
	title: "Reddit",
	backgroundColor: "#d7d7d7",
	layout: "vertical",
	fullscreen: true,
	navBarHidden:true,
});

var favoritesButton = Titanium.UI.createLabel({
	text: "Favorites",
	top: 35,
	right: 13,
	color:"#fff",
	font: {fontSize:12},
});

var star = Titanium.UI.createImageView({
	image: "star/favorites.png",
	top: 15,
	right:30,
	height:20,
	width: 20,
});

var reddit = Titanium.UI.createLabel({
	text: "Reddit",
	top: 13,
	color:"#48c3cb",
	font: {fontSize:30},
});

var topView = Titanium.UI.createView({
			height: 60,
			backgroundColor: "#000",
			opacity: .9,
			width: "100%",
			top: 0,
		});


topView.add(favoritesButton,reddit, star);
win.add(topView);



//Runs detail Window
var run = function(data){
	var detail = Ti.UI.createWindow({
		backgroundColor: "#000",
		fullscreen: true,
		barColor: "#000",
	});
	
	var addButton = Ti.UI.createButton({ 
    	systemButton: Ti.UI.iPhone.SystemButton.ADD 
	});

	var scroll = Ti.UI.createScrollView({
			top: 0,
			contentWidth: "auto",
			contentHeight: "auto",
			showVerticalScrollIndicator: true,
			layout: "vertical",
		    width: "auto",
		    height: "auto",
		});
		
	var detailTitle = Titanium.UI.createLabel({
			text: data.title,
			top: 30,
			height:"auto",
			width: 300,
			color:"#ffff",
			textAlign: "center",
			font: {fontSize:18},
		});
	var detailImg = Titanium.UI.createImageView({
			image: data.image,
			width: "100%",
			top: detailTitle.top+detailTitle.height+ 20,
		});
		
	var saveAlert = Ti.UI.createAlertDialog({
		message: 'Add '+'"'+detailTitle.text+'"'+' to favorites?',
		title: "Save Reddit Post",
		cancel: 1,
		buttonNames: ['Save', 'Cancel'],
	});
		

		addButton.addEventListener("click", function(save){
		var savePhoto = Ti.UI.createAlertDialog({
				    cancel: 1,
				    save: 0,
				    buttonNames: ['Save', 'Cancel'],
				    message: 'Add Photo to Favorites?',
				    title: 'Add to Favorites',
				  });
				  
				  savePhoto.addEventListener('click', function(b){
					    if (b.index === b.source.save){
					     net.create(detailImg.image,detailTitle.text);
						 net.read();
						 var photoSaved = Ti.UI.createAlertDialog({
							 message: 'Photo has been added to favorites',
							 title: 'Added',
						});
						navWindow.closeWindow(detail);	
						photoSaved.show();
						
					    };
					  });
  
				 savePhoto.show();  
});
	
	scroll.add(detailTitle, detailImg);	
	detail.add(scroll);	
	detail.setRightNavButton(addButton);
	navWindow.openWindow(detail);
};

var updateWindow = function(update){
	var updateWin = Ti.UI.createWindow({
		fullscreen: true,
		backgroundColor: "#fff",
	});
	
	var updateTitle = Titanium.UI.createTextField({
		color: "#01b4ff",
		top: 90,
		height:50,
		width:"240",
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:"example: funny cat, funny drive thru", 
	});
	
	var rename = Titanium.UI.createLabel({
		text: "Rename Image",
		top: 20,
		color:"#48c3cb",
		font: {fontSize:42},
	});
	
	var submitButton = Ti.UI.createView({
		backgroundColor: "#48c3cb",
		borderRadius: 5,
		height: 60,
		width: 130,
		top: 200,
	});
	
	var submitLabel = Ti.UI.createLabel({
		text: "Submit",
		color: "#fff",
		font: {fontSize: 28, fontFamily: "Helvetica", fontWeight: "light"},
	});

	submitButton.addEventListener("click", function(e){
		if (updateTitle.value != ""){
		net.update(update, updateTitle.value);
		navWindow.closeWindow(updateWin);
		}else{
			var error = Ti.UI.createAlertDialog({
				title: "Empty Text",
				message: "Please include an image name",
			});
			error.show();
		}
	}),
	submitButton.add(submitLabel);

	updateWin.add(updateTitle, rename, submitButton);
	navWindow.openWindow(updateWin);
};

var runFavorites = function(data2){
	var detail = Ti.UI.createWindow({
		backgroundColor: "#000",
		fullscreen: true,
		barColor: "#000",
	});
	
	var editButton = Ti.UI.createButton({ 
    	systemButton: Ti.UI.iPhone.SystemButton.EDIT
	});

	var scroll = Ti.UI.createScrollView({
			top: 0,
			contentWidth: "auto",
			contentHeight: "auto",
			showVerticalScrollIndicator: true,
			layout: "vertical",
		    width: "auto",
		    height: "auto",
		});
		
	var detailTitle = Titanium.UI.createLabel({
			text: data2.title,
			top: 30,
			height:"auto",
			width: 300,
			color:"#ffff",
			textAlign: "center",
			font: {fontSize:18},
		});
	var detailImg = Titanium.UI.createImageView({
			image: data2.image,
			width: "100%",
			top: detailTitle.top+detailTitle.height+ 20,
		});
		
		
	editButton.addEventListener("click", function(e){
		var choices = Ti.UI.createAlertDialog({
				    cancel: 1,
				    del: 2,
				    update: 0,
				    buttonNames: ['Update', 'Cancel', 'Delete'],
				    message: 'Edit Photo',
				    title: 'Edit',
				  });
				  
				  choices.addEventListener('click', function(b){
					    if (b.index === b.source.update){
					    	updateWindow(data2.id);
					    };
					    if (b.index === b.source.del){
					      var confirm = Ti.UI.createAlertDialog({
							    cancel: 1,
							    del: 0,
							    buttonNames: ['Delete','Cancel'],
							    message: 'Are you sure you want to delete the photo?',
							    title: 'Delete',
							  });
							  confirm.addEventListener('click', function(c){
							  	if (c.index === c.source.del){
							  		net.del(data2.id);
							  		navWindow.closeWindow(detail);
							  	};
							  });
							confirm.show();
					    };
					  });
  
				 choices.show();  
});

	
	scroll.add(detailTitle, detailImg);	
	detail.add(scroll);	
	detail.setRightNavButton(editButton);
	navWindow.openWindow(detail);
};

var test1 = Titanium.UI.createWindow({
	backgroundColor: "#252525",
	fullscreen: true,
	title: "Favorite Photos",
	});


var profilesTable = function(profilesData){
	
	
var viewContainer = Ti.UI.createScrollView({
	top:0,
	width: pWidth,
	backgroundColor :"#252525",
	layout: "horizontal",
	contentWidth: pWidth,
	height: pHeight-64,
	showVerticalScrollIndicator: true,
	
});

for (i in profilesData){
	var view = Ti.UI.createView({
		backgroundColor: "#252525",
		top: margin,
		left: margin,
		width: size,
		height: size,
		borderRadius: 5,
		id: profilesData[i].id,
	});
	
	var newImage = Ti.UI.createImageView({
		image: profilesData[i].image,
		title: profilesData[i].title,
		top: 0,
		width: view.width*2,
		height: view.width*2,
		id: profilesData[i].id,
	});
	
	view.add(newImage);
	viewContainer.add(view);
};


viewContainer.addEventListener('click', function(e){
   runFavorites(e.source);
});

		
	
test1.add(viewContainer);
};



//Function that runs to build my UI
var  userInterface = function(e){
		
	var rowData = [];
	
	var row = Ti.UI.createScrollView({
			top: 0,
			contentWidth: "auto",
			contentHeight: "auto",
			showVerticalScrollIndicator: true,
			layout: "vertical",
		    width: "auto",
		    height: "auto",
		    data: e,
		});
		
		
	for (i=0, j=e.length; i<j; i++){
		
		var test = Titanium.UI.createView({
			height:300,
			width:320,
			top:20,
			backgroundColor: "#fff",
			borderRadius:0,
		});
		
		//if the last 3 characters are not jpg than it skips to the next image
		if (e[i].pic.substr(e[i].pic.length - 3 != "jpg")){
			i++;
		};

		var img = Titanium.UI.createImageView({
			image: e[i].pic,
			title: e[i].title,
			top: 36,
			width: 320,
			height:300,
			
		});
		
		//if the last 3 characters are not jpg than .jpg is added to the end
		if (e[i].pic.substr(e[i].pic.length - 3 != "jpg")){
			img.image = e[i].pic+ ".jpg";
		};
		
				
		

		var by = Titanium.UI.createLabel({
			image: e[i].pic,
			title: e[i].title,
			text: "Submited by "+ e[i].author,
			left: 10,
			color:"#232323",
			font: {size:12},
		});
		
		var author = Titanium.UI.createLabel({
			image: e[i].pic,
			title: e[i].title,
			text: e[i].author+ " • " +e[i].score+ " pts",
			left: 10,
			bottom:5,
			color:"#2cbdc6",
			font: {fontSize: 16, fontWeight: "lite"},
		});
		
		var points = Titanium.UI.createLabel({
			image: e[i].pic,
			title: e[i].title,
			text: e[i].score,
			left: 10,
			top:25,
			color:"#2cbdc6",
			font: {fontSize: 18, fontWeight: "bold"},
		});
		
		var pts = Titanium.UI.createLabel({
			image: e[i].pic,
			title: e[i].title,
			text: "pts",
			left: points.left+43,
			top:27,
			color:"#fff",
			font: {size:14},
		});


		var bgBar = Titanium.UI.createView({
			image: e[i].pic,
			title: e[i].title,
			height:36,
			width: 320,
			top:0,
			backgroundColor:"#ffff",
			
		});
		
		var title = Titanium.UI.createLabel({
			image: e[i].pic,
			title: e[i].title,
			text: e[i].title,
			height: 72,
			left: 10,
			right:10,
			top:0,
			color:"#ffff",
		});
		
		var stats = Titanium.UI.createView({
			image: e[i].pic,
			title: e[i].title,
			height:100,
			width: 320,
			bottom:0,
			backgroundColor:"#000",
			opacity: .8,
			
		});
	
		
	
		//Used similar code from creating table view rows to generate each idividual view for each post.
		test.add(bgBar);
		bgBar.add(by);
		stats.add(author, title);
		test.add(img, stats);
		row.add(test);
		rowData.push(row);
		
		//Runs detail window function
		test.addEventListener("click", function(event){
			run(event.source);
		});
	};
		win.add(row);
};

favoritesButton.addEventListener("click", function(save){
		navWindow.openWindow(test1);
	});
	
star.addEventListener("click", function(save){
		navWindow.openWindow(test1);
	});

//exports user interface function to be called in data.js
exports.userInterface = userInterface;

//make a navigation window and sets the window to win.
var navWindow = Ti.UI.iOS.createNavigationWindow({
	window: win,
});


profilesTable();

exports.profilesTable = profilesTable;


//opens nav window
navWindow.open();

