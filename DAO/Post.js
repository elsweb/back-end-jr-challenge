function PostDAO(conn){
	this._table = 'post';
	this._conn = conn;
}
PostDAO.prototype.ListAll = function(qurl,limit,callback){
	var author = '';
	var category = '';
	var from_post_cat = '';
	var and_post_cat = '';
	if(Object.keys(qurl).length > 0){
		if(qurl.filter_author != undefined){
			author   = qurl.filter_author == '' ? '' : ' AND p.author_id = '+ qurl.filter_author +' ';
		}
		if(qurl.filter_category != undefined ){
			if(!qurl.filter_category == ''){
			from_post_cat = ', post_cat as pc'
			and_post_cat = 'AND p.post_id = pc.post_id';
			category = qurl.filter_category == '' ? '' : ' AND pc.category_id = ' + qurl.filter_category;
			}
		}
	}
	var sql = 'SELECT DISTINCT p.post_id as post_id, '+
					  'p.post_title as post_title,'+
					  'p.post_content as post_content,'+
					  'p.post_date as post_date,'+
					  'p.post_view as post_view,'+
					  'a.author_name as author '+
					  'FROM '+this._table+' as p, author as a ' + from_post_cat +' '+
					  'WHERE p.author_id = a.author_id ' + and_post_cat + author + category +
					  ' LIMIT ' + limit;
	this._conn.query(sql,callback);
}
PostDAO.prototype.Create = function(array,callback){
	var sql = 'INSERT INTO '+ this._table +' (author_id, post_title, post_content) VALUES ?';
	var values = [[
	  array.author_id,
	  array.post_title,
	  array.post_content  
	  ]];
	this._conn.query(sql,[values],callback);
}
PostDAO.prototype.ListCat = function(id,callback){
	if(id){
		sql = 'SELECT p.post_cat_id as post_cat_id, p.post_id as post_id, p.category_id as category_id, a.category_name as category_name FROM post_cat as p, category as a WHERE p.category_id =  a.category_id AND p.post_id = '+id+' '
	}else{
		sql = 'SELECT p.post_cat_id as post_cat_id, p.post_id as post_id, p.category_id as category_id, a.category_name as category_name FROM post_cat as p, category as a WHERE p.category_id =  a.category_id '
	}
	this._conn.query(sql,callback);
}
PostDAO.prototype.AddCat = function(array,callback){
	var sql = 'INSERT INTO post_cat (post_id, category_id) VALUES ?';
	var values = [[
	  array.post_id,
	  array.category_id,	   
	  ]];
	this._conn.query(sql,[values],callback);	
}
PostDAO.prototype.CheckCat = function(array, callback){
	sql = 'SELECT COUNT(category_id) as count_cat '+
		  'FROM post_cat '+ 
		  'WHERE category_id = '+ array.category_id + ' AND post_id = ' + array.post_id
	this._conn.query(sql,callback);
}
PostDAO.prototype.Read = function(id,callback){	
	this._conn.query('SELECT * FROM '+ this._table +' WHERE post_id = ?', id, callback);
}
PostDAO.prototype.Count = function(callback){
	sql = 'SELECT count(*) as Rows FROM ' + this._table;
	this._conn.query(sql,callback);
}
PostDAO.prototype.ReadPostAuthor = function(id,callback){
	sql = 'SELECT p.post_id as post_id,'+
	      'p.author_id as author_id,'+
	      'p.post_title as post_title,'+
	      'p.post_content as post_content,'+
	      'p.post_date as post_date,'+
	      'p.post_view as post_view,'+
	      'a.author_name as author_name, '+
	      'a.author_id as author_id '+
	      'FROM post as p, author as a '+
	      'WHERE p.author_id = a.author_id AND p.post_id = ?';
	this._conn.query(sql,id,callback);
}
PostDAO.prototype.Update = function(array,callback){	
	this._conn.query('UPDATE '+ this._table +' SET ? WHERE post_id = ? ', [{
	  	author_id: array.author_id,
	  	post_title: array.post_title,
	  	post_content: array.post_content
	  },array.post_id], callback);	
}
PostDAO.prototype.UpdateView = function(id,val,callback){
	this._conn.query('UPDATE '+ this._table +' SET ? WHERE post_id = ? ', [{
	  	post_view: val	  	
	  },id], callback);
}
PostDAO.prototype.Delete = function(id,callback){
	this._conn.query('DELETE FROM '+ this._table +' WHERE post_id = '+ id , callback);
}
module.exports = function(){
	return PostDAO;
}