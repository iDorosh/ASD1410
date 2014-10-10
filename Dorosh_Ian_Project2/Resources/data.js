//Requires the ui.js file to run
var ui = require("ui");

//Function to check network status
var netCheck = function(){
	
	//Sets the api to the funny subreddit
	var url = "http://api.reddit.com/r/funny";
	
	//If network exists the onload function gathers all the data from the json file in this case title, url/image, score, and author.
	if (Ti.Network.online){
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				var json = JSON.parse(this.responseText);
				var posts = json.data.children;
				var postArray = [];
				for (i=0, j=posts.length; i<j; i++){
					var post = {
						title: posts[i].data.title,
						pic: posts[i].data.url,
						score: posts[i].data.score,
						author: posts[i].data.author,
					};	
					postArray.push(post); //Pushes the post data to post array
				}
				ui.userInterface(postArray); //runs function in ui.js call userInterface and passes through postArray data.
			},
			
			//On error runs an erro function
			onerror: function(e){
				alert("error: "+e.error);
			},
		});
		//Gets the address in the url variable
		xhr.open("GET", url);
		xhr.send();
	} else {
		alert("Network unavailable, please check nework settings");
	};
};

//exports netCheck function to app.js were it can be called.
exports.netCheck = netCheck;