var twitterWin = function(params){
	var tab = params.tab;
	var win=Ti.UI.createWindow();
	var twitterUser = 'pecdev';
	var tableData=[];
	win.title='@'+twitterUser;
	var tableView = Ti.UI.createTableView();
	var refreshTable=function(table){
		tableData.length=0;
		xhr = Titanium.Network.createHTTPClient();
		xhr.setTimeout(20000);
		xhr.onload = function(){
			var json = JSON.parse(this.responseText);
			for(var i=0;i<json.length;i++){
				var row = Ti.UI.createTableViewRow({height:'auto',hasChild:true,text:json[i].text,date:json[i].created_at,img:json[0].user.profile_image_url});
				var label1 = Ti.UI.createLabel({height:'auto',text:json[i].text,left:10,right:20,top:20,bottom:10,font:{fontSize:14}});
				var label2 = Ti.UI.createLabel({text:json[i].created_at.substring(0,20),left:10,top:0,height:'auto',width:'auto',font:{fontSize:12,fontWeight:'bold'}});
				row.add(label1);
				row.add(label2);
				tableData[i]=row;
			}
			table.data=tableData;
			endReloading();
		};
		xhr.onerror = function(e)
		{
			alert(e);
		};

		xhr.open('GET', 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name='+twitterUser);
		xhr.send();
	};
	var formatDate = function(){
		var date = new Date();
		var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
		if (date.getHours()>=12){
			datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+date.getMinutes()+' PM';
		}else{
			datestr+=' '+date.getHours()+':'+date.getMinutes()+' AM';
		}
		return datestr;
	};
	var endReloading = function(){
		tableView.setContentInsets({top:0},{animated:true});
		reloading = false;
		lastUpdatedLabel.text = "Last Updated: "+formatDate();
		statusLabel.text = "Pull down to refresh...";
		actInd.hide();
		arrow.show();
	};
// taken from the Kitchen Sink
//==================================================
	var border = Ti.UI.createView({
		backgroundColor:"#576c89",
		height:2,
		bottom:0
	});

	var tableHeader = Ti.UI.createView({
		backgroundColor:"#e2e7ed",
		width:320,
		height:60
	});

	tableHeader.add(border);

	var arrow = Ti.UI.createView({
		backgroundImage:"whiteArrow.png",
		width:23,
		height:60,
		bottom:10,
		left:20
	});

	var statusLabel = Ti.UI.createLabel({
		text:"Pull to reload",
		left:55,
		width:200,
		bottom:30,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:13,fontWeight:"bold"},
		shadowColor:"#999",
		shadowOffset:{x:0,y:1}
	});

	var lastUpdatedLabel = Ti.UI.createLabel({
		text:"Last Updated: "+formatDate(),
		left:55,
		width:200,
		bottom:15,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:12},
		shadowColor:"#999",
		shadowOffset:{x:0,y:1}
	});

	var actInd = Titanium.UI.createActivityIndicator({
		left:20,
		bottom:13,
		width:30,
		height:30
	});

	tableHeader.add(arrow);
	tableHeader.add(statusLabel);
	tableHeader.add(lastUpdatedLabel);
	tableHeader.add(actInd);
	tableView.headerPullView = tableHeader;
	var pulling = false;
	var reloading = false;
	refreshTable(tableView);	
	win.add(tableView);
	tableView.addEventListener('scroll',function(e){
		var offset = e.contentOffset.y;
		var t = Ti.UI.create2DMatrix();
		if (offset <= -65.0 && !pulling){
			t = t.rotate(-180);
			pulling = true;
			arrow.animate({transform:t,duration:180});
			statusLabel.text = "Release to refresh...";
		} else if (pulling && offset > -65.0 && offset < 0) {
			pulling = false;
			arrow.animate({transform:t,duration:180});
			statusLabel.text = "Pull down to refresh...";
		}
	});
	tableView.addEventListener('scrollEnd',function(e){
		if (pulling && !reloading && e.contentOffset.y <= -65.0){
			reloading = true;
			pulling = false;
			arrow.hide();
			actInd.show();
			statusLabel.text = "Reloading...";
			tableView.setContentInsets({top:60},{animated:true});
			arrow.transform=Ti.UI.create2DMatrix();
			refreshTable(tableView);
		}
	});
	tableView.addEventListener('click',function(e){
		tab.open(twitterDetail({tab:tab,text:e.rowData.text,date:e.rowData.date,img:e.rowData.img,name:twitterUser}));
	});

//==================================================
	
	return win;
};