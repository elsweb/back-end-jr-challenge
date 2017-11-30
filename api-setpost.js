var http = require('http');

var config = {
    hostname: 'localhost',
    port:3030,
    path:'/post/create',
    method: 'POST',
    headers:{
      'Accept':'application/json',
      'Content-type':'application/json'
    }
};

var client = http.request(config,function(res){
  console.log(res.statusCode);
  res.on('data',function(body){
    console.log('json:' + body);
  });  
});

var post = {
  author_id : 1,//author ID
  post_title : 'API Example',
  post_content : 'Insert for API Example'
}

client.end(JSON.stringify(post));