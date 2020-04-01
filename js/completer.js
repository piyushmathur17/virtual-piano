function Completer(){
	this.predict=async function(){
		document.getElementById("win").style="visibility: visible; left: 0px; top: 5px;";
		document.getElementById("s1").value="loading prediction... please wait...";
		console.log("hello ji");
		var inputlist=[];
		for(var i=0;i<notesPlayed.length;i++){
			var n=notesPlayed[i];

			var t= n[0];
		    var str= n;
		    
		    var a;
		    str= str.substring(1,3);
		    if(t=='a'){
		        a = notes.w_c.indexOf(Number(str));
		        inputlist.push(notes.w_n[a]);
		    }else 
		    {
		        a = notes.b_c.indexOf(Number(str));
		        inputlist.push(notes.b_n[a]);
		    }
		}
	    var input= inputlist.join(' ');
		//console.log(input);
		this.finalcall(input);
	};
	this.res=function(){
		notesPlayed=[];
	}
	this.finalcall=async function(inputstr){
		console.log("loading prediction...");
		const Http = new XMLHttpRequest();
	    const url='http://127.0.0.1:5000/yoyo/';
	    const data= {"d": inputstr};
    	var f;
    	writ= function(data){
    		console.log(data['sequence']);
    		var str= data['sequence'];
    		var count=0;
    		for(var i=0;i<str.length;i++)
    		{
    			if(str[i]=='[')count++;
    			else if(str[i]==']')count--;
    		}
    		if(count!=0)str=str+']';
    		var nstr="";
    		for(var i=0;;i++)
    		{
    			if(str[i]==' '){nstr=nstr+str.substr(i+1);break;}
    			else if(str[i]=='[')nstr=nstr+"[";
    			else nstr=nstr+str[i]+" ";
    		}
    		document.getElementById("s1").value= nstr;
    	}
	    fetch(url, {
		  method: 'POST', // or 'PUT'
		  headers: {
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(data),
		})
		.then((response)=>response.json())
		.then(async function(data) {
		 f= data;
		 //await console.log("f is ..",f);
		 await writ(f); 
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
		
	}
	// this.writ= function(data){
	// 	console.log("in writ", data)
	

	
	}
	

var completer= new Completer();
