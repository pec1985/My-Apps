var twitterDetail=function(params){
	var tab = params.tab;
	var text = params.text;
	var img = params.img;
	var name = params.name;
	var date = params.date;
	var win = Ti.UI.createWindow({backgroundColor:'white'});

	var view1 = Ti.UI.createView({left:0,top:0,right:0,height:60,backgroundColor:'#ccc'});
	var profPic = Ti.UI.createImageView({left:15,image:img,width:48,height:48});
	var profName = Ti.UI.createLabel({left:70,text:'@'+name,font:{fontWeight:'bold',fontSize:30}});
	view1.add(profPic);
	view1.add(profName);
	
	var webViewHtml='';
	webViewHtml+='<div style="position:absolute;top:400px;font-family:helvetica">';
	webViewHtml+=text;
	webViewHtml+='</div></div>';
	
	var view2=Ti.UI.createWebView({html:webViewHtml,top:-330,backgroundColor:'transparent'});
	var view3=Ti.UI.createView({left:0,right:0,height:150,bottom:0,backgroundColor:'white'});
	win.add(view2);
	win.add(view1);
	win.add(view3);
	return win;
};