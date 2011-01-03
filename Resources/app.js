Ti.include('listing.js');
Ti.include('theapp.js');
Ti.include('thmbnail.js');
Ti.include('twitter.js');
Ti.include('twitterdetail.js');
Titanium.UI.setBackgroundColor('#000');

//your developer name goes in developerName, exmple: var developerName='John Smith';
//
var developerName='';

var devName=developerName.replace(/ /gi, '+').toLowerCase();
var itunesInfo = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?term='+devName+'&entity=software';
xhr = Titanium.Network.createHTTPClient();
xhr.setTimeout(20000);
xhr.onload = function(){
	var json = JSON.parse(this.responseText);
	var tabGroup = Titanium.UI.createTabGroup();
	var tab1 = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
		title:'apps'
	});
	tab1.window=listing({tab:tab1,json:json,title:developerName});
	var tab2 = Titanium.UI.createTab({  
	    icon:'KS_nav_ui.png',
	    title:'tweets'
	});
	tab2.window=twitterWin({tab:tab2});
	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);  
	tabGroup.open();	
};
xhr.onerror = function(e)
{
	alert(e);
};

xhr.open('GET', itunesInfo);
xhr.send();
