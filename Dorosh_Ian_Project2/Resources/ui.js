
//Creates Main Window
var win = Ti.UI.createWindow({
	title: "Reddit",
	backgroundColor: "#d7d7d7",
	layout: "vertical",
	fullscreen: true,
});





//Runs detail Window
var run = function(data){
	var detail = Ti.UI.createWindow({
		backgroundColor: "#000",
		fullscreen: true,
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
			font: {size:12},
		});
	var detailImg = Titanium.UI.createImageView({
			image: data.image,
			width: "100%",
			top: detailTitle.top+detailTitle.height+ 20,
		});
		
	
	scroll.add(detailTitle, detailImg);	
	detail.add(scroll);	
	navWindow.openWindow(detail);
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
			width:300,
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
			width: 300,
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
			width: 300,
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
			width: 300,
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

//exports user interface function to be called in data.js
exports.userInterface = userInterface;

//make a navigation window and sets the window to win.
var navWindow = Ti.UI.iOS.createNavigationWindow({
	window: win,
});

//opens nav window
navWindow.open();
