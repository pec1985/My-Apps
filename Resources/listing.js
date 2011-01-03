var listing = function(params){
	var tab = params.tab;
	var json = params.json;
	var win = Ti.UI.createWindow({title:params.title});
	var tableData=[];
	for(var i = 0;i<json.resultCount;i++){
		var row = Ti.UI.createTableViewRow({height:71,hasChild:true,app:json.results[i]});
		if (i%2 == 0){
			row.backgroundImage='row1.png';
		}else{
			row.backgroundImage='row2.png';
		}
		
		var image = Ti.UI.createImageView({left:10,image:json.results[i].artworkUrl60,width:56,height:56});
		var label1 = Ti.UI.createLabel({left:76,height:20,width:175,text:json.results[i].trackName,font:{fontWeight:'bold',fontSize:16}});
		var label2 = Ti.UI.createLabel({left:76,height:16,top:5,width:'100%',text:json.results[i].artistName,font:{fontWeight:'bold',fontSize:12},color:'#3a3a3a'});
		var label4 = Ti.UI.createLabel({height:20,right:10,width:'100%',font:{fontWeight:'bold',fontSize:12},textAlign:'right',color:'#3a3a3a'});
		if(json.results[i].price==0){
			label4.text='FREE';
		} else {
			label4.text='$'+json.results[i].price;
		}

	/*
		var label3 = Ti.UI.createLabel({left:200,height:16,bottom:10,width:200,text:'ratings',font:{fontSize:12},color:'#3a3a3a'});
		var rating1 = Ti.UI.createImageView({left:76,bottom:16,height:11,width:11,image:'rating1.png'});
		var rating2 = Ti.UI.createImageView({left:76+13,bottom:16,height:11,width:11,image:'rating1.png'});
		var rating3 = Ti.UI.createImageView({left:76+13+13,bottom:16,height:11,width:11,image:'rating2.png'});
		var rating4 = Ti.UI.createImageView({left:76+13+13+13,bottom:16,height:11,width:11,image:'rating2.png'});
		var rating5 = Ti.UI.createImageView({left:76+13+13+13+13,bottom:16,height:11,width:11,image:'rating2.png'});
	*/
		row.add(image);
		row.add(label1);
		row.add(label2);
		row.add(label4);
	/*	row.add(label3);
		row.add(rating1);
		row.add(rating2);
		row.add(rating3);
		row.add(rating4);
		row.add(rating5);
	*/
		createThumbnail(image,56,10);
		tableData[i]=row;
	}
	var table = Ti.UI.createTableView({data:tableData,separatorStyle:0,backgroundColor:'#adadb0'});
	win.add(table);
	table.addEventListener('click',function(e){
		tab.open(app({tab:tab,json:e.rowData.app}));
	});
	return win;
};