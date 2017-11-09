var http=require("http");
var querystring=require("querystring");
var url=require("url");
var fs=require("fs");
var users=JSON.parse(fs.readFileSync("./1.txt"));
http.createServer(function(req,res){
    var obj=url.parse(req.url);
    var pn=url.parse(req.url).pathname;
    fs.readFile("1.html",function(err,data){
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            console.log(err);
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
        }
        res.end();
    });
    var str= "";
    req.on("data",function(chunk){
        str+=chunk;
    });
    req.on("end",function(){
        
        var post=querystring.parse(str);
        var get=url.parse(req.url).query;

        //console.log(post,get,pn);
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        if(pn=='/reg'){
            if(users[post.name]){
                res.write("用户名已存在");
            }
            else{
                users[post.name]=post.pass;
                res.write("您注册成功");
                fs.writeFileSync("./1.txt",JSON.stringify(users));
            }
        }
        else if(pn=='/login'){
            if(users[post.name]==null){
                res.write("该用户名未注册，请先进行注册");
            }
            else if(users[post.name]!=post.pass){
                res.write("您的密码错误");
            }
            else{
                res.write("登录成功");
            }
        }
    });
}).listen(8000);