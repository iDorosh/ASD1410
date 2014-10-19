
Titanium.UI.setBackgroundColor('#000');


var tabGroup = Titanium.UI.createTabGroup();


var profiles = Titanium.UI.createWindow({  
    title:'Profiles',
    backgroundColor:'#fff'
});

var createProfiles = Titanium.UI.createWindow({  
    title:'Create Profile',
    backgroundColor:'#023348'
});

var ui = require("ui");
var data = require("data");
data.read();



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


tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

tabGroup.open();
