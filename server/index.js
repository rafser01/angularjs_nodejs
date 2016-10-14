var express=require('express');
var bodyParser = require('body-parser');
var mysql=require('mysql');

var server=express();
server.use(express.static('../client'));
var url_encoder_parser=bodyParser.urlencoded({ extended: false });
var json_parser=bodyParser.json();

var connection=mysql.createConnection({
	host:'127.0.0.1',
	connectionLimit:5, //pool size
	user:'root',
	password:'',
	database:'smartmess2',
	connectTimeout:1000,
	debug:false
});
 
var member={"user":"",
			"password":"",
			"email":"",
			"gender":"",
			"dob":"",
			"location":"",
			"image":"",
			"firstName":"",
			"lastName":"",
			"messName":"",
			"type":"",
			"occupation":"",
			"remark_mem1":"",
			"remark_mem2":""
}



connection.connect();
//var connection = mysql.createConnection('mysql://root:r50493233@127.0.0.1:3306/smartmess2?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

//connection; alternative to connection.connect();
server.get('/fetchUsers',function(req,res){
	
 
 
	
	connection.query('select * from member',function(err, rows, fields){
		if(err){
			console.log('error  ',err);
			 
		}else {
			console.log("connection id",connection.threadId);
			res.send(rows)
			
			
		}
	});
	 
	 
//	connection.end(); 
	//for closing connection but when a new connection try to generate, it will send error
});

var pool=mysql.createPool({
	connectionLimit:5,
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'smartmess2',
	connectTimeout:1000,
	debug:false
});

function poolTest(req,res){
	pool.getConnection(function(err,connection){
		if (err) {
	           connection.release();
	           res.json({"code" : 100, "status" : "Error in connection database"});
	           return;
		}
		console.log('connected as id ' + connection.threadId);
		connection.query('select * from member',function(err, rows, fields){
			if(err){
				console.log('error  ',err);
				 
			}else {
				connection.release();
				res.send(rows)
				
			}
		});
		connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;     
      });
		
	});
};

server.get('/ttt',function(req,res){
	
	poolTest(req,res);
});

server.post('/save-member/',json_parser,function(req,res){
	
	console.log('save member', req.body)
});

server.get('/checkUserInfo/:id/:password/',function(req,res){
	var id=req.params.id;
	var password=req.params.password;
 
	pool.getConnection(function(err,connection){
		if (err) {
	           connection.release();
	           res.json({"code" : 100, "status" : "Error in connection database"});
	           return;
		}
		console.log('connected as id ' + connection.threadId);
		var query='select * from member where email="'+id+'" and password="'+password+'";'
		connection.query(query,function(err, rows, fields)
				{
			if(err){
				console.log('error  ',err);
				 
			}else {
				connection.release();
				
				
			}
			 if(rows[0] != undefined && rows[0].email === id){
				 
			member.user=rows[0].user;
			member.password=rows[0].password
			member.email=rows[0].email
			member.gender=rows[0].gender
			member.dob=rows[0].dob
			member.location=rows[0].location
			member.image=rows[0].image
			member.firstName=rows[0].firstName
			member.lastName=rows[0].lastName
			member.messName=rows[0].messName
			member.type=rows[0].type
			member.occupation=rows[0].occupation
			member.remark_mem1=rows[0].remark_mem1
			member.remark_mem2=rows[0].remark_mem2
			
			console.log(member)
			 }
			  
		});
		
		res.send(member)
	})
		
//		connection.on('error', function(err) {      
//            res.json({"code" : 100, "status" : "Error in connection database"});
//            return;     
//      });
		
	 
	 
	
	 
		
	
	
	
	
	 
	 
});
 

 

server.listen(8081,function(){
	console.log('Server starts at 8081');
	
});