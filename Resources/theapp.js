var app = function(params){
	var tab = params.tab;
	var json = params.json;
	var win = Ti.UI.createWindow({backgroundImage:'bgall.png'});
	var scrollView = Ti.UI.createScrollView({left:0,right:0,top:0,bottom:0,contentHeight:'auto',contentWidth:'auto',layout:'vertical'});
	var header = Ti.UI.createView({left:0,right:0,top:0,height:'auto',backgroundImage:'bgapp.png'});
	var icon = Ti.UI.createImageView({image:json.artworkUrl60,left:10,top:5,height:57,width:56});
	var label1 = Ti.UI.createLabel({left:76,height:20,top:5,width:175,text:json.trackName,font:{fontWeight:'bold',fontSize:16}});
	var label2 = Ti.UI.createLabel({left:76,height:20,top:20,width:175,text:json.sellerName,font:{fontWeight:'bold',fontSize:12},color:'#3a3a3a'});
	var label3 = Ti.UI.createLabel({left:10,height:'auto',top:75,right:10,text:json.description+'\n',font:{fontSize:12},color:'#3a3a3a'});
	var buy = Ti.UI.createButton({width:50,height:24,backgroundImage:'free.png',right:10,top:30,font:{fontWeight:'bold',fontSize:12}});
	if(json.price==0){
		buy.title='FREE';
	}else{
		buy.title='$'+json.price;
	}
	createThumbnail(icon,56,10);
	header.add(icon);
	header.add(label1);
	header.add(label2);
	header.add(buy);
	header.add(label3);
	images=[];
	for(var i=0;i<json.screenshotUrls.length;i++){
		images[i]=Ti.UI.createImageView({image:json.screenshotUrls[i],height:350});
	}
	var scrollableView = Ti.UI.createScrollableView({views:images,top:0,left:0,right:0,height:367,backgroundImage:'bgscroll.png'});
	var footer = Ti.UI.createView({backgroundColor:'#ccc',top:0,right:0,left:0,height:'auto'});
	var tellFriend = Ti.UI.createButton({left:5,top:10,width:150,height:30,title:'tell a friend'});
	var reportProblem = Ti.UI.createButton({right:5,top:10,width:150,height:30,title:'report a problem'});
	var otherInfoHtml='';
	var sellerUrl;
	if(!json.sellerUrl){
		sellerUrl='';
	} else{
		sellerUrl=json.sellerUrl;
	}
	var year=json.releaseDate.substring(0, 4);
	var day=json.releaseDate.substring(8, 10);
	var month=json.releaseDate.substring(5, 7);
	switch(month){
	    case '01': month = 'January'; break;
	    case '02': month = 'February'; break;
	    case '03': month = 'March'; break;
	    case '04': month = 'April'; break;
	    case '05': month = 'May'; break;
	    case '06': month = 'June'; break;
	    case '07': month = 'July'; break;
	    case '08': month = 'August'; break;
	    case '09': month = 'September'; break;
	    case '10': month = 'October'; break;
	    case '11': month = 'November'; break;
	    case '12': month = 'December'; break;
	}
	otherInfoHtml+='<table style="font-size:12px;color:#3a3a3a;font-family:helvetica"width="320px">';
	otherInfoHtml+='<tr valign="top" width="100px">';
	otherInfoHtml+='	<td style="text-align:right;font-weight:bold">Company</td>';
	otherInfoHtml+='	<td>'+json.sellerName+'<br />'+sellerUrl+'</td>';
	otherInfoHtml+='</tr>';
	otherInfoHtml+='<tr valign="top">';
	otherInfoHtml+='	<td style="text-align:right;font-weight:bold">Post Date</td>';
	otherInfoHtml+='	<td>'+month+' '+day+' '+year+'</td>';
	otherInfoHtml+='</tr>';
	otherInfoHtml+='<tr valign="top">';
	otherInfoHtml+='	<td style="text-align:right;font-weight:bold">Version</td>';
	otherInfoHtml+='	<td>'+json.version+'</td>';
	otherInfoHtml+='</tr>';
	otherInfoHtml+='<tr valign="top">';
	otherInfoHtml+='	<td style="text-align:right;font-weight:bold">Rating</td>';
	otherInfoHtml+='	<td>'+json.trackContentRating+'</td>';
	otherInfoHtml+='</tr>';
	otherInfoHtml+='</table>';
	
	var otherInfo = Ti.UI.createWebView({html:otherInfoHtml,height:'auto',top:50,backgroundColor:'transparent',touchEnable:false});
	footer.add(tellFriend);
	footer.add(reportProblem);
	footer.add(otherInfo);
	
	
	scrollView.add(header);
	scrollView.add(scrollableView);
	scrollView.add(footer);
	tellFriend.addEventListener('click',function(){
		var emailDialog = Titanium.UI.createEmailDialog();
		emailDialog.subject = "Check out this awesome app!";
		emailDialog.toRecipients = [];
		emailDialog.messageBody = json.trackViewUrl;
		emailDialog.open();
	});
	reportProblem.addEventListener('click',function(){
		Ti.UI.createAlertDialog({title:'currently unavailable, sorry'}).show();
	});
	buy.addEventListener('click',function(){
		Ti.Platform.openURL(json.trackViewUrl);
	});
	scrollableView.addEventListener('scroll',function(){
		scrollView.scrollTo(0,header.toImage().height);
	});
	//331
	win.add(scrollView);

	return win;
};