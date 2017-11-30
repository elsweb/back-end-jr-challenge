function CategoryDAO(conn){
	this._table = 'category';
	this._conn = conn;
}
CategoryDAO.prototype.ListAll = function(callback){
	sql = 'SELECT p.category_id as category_id, p.category_name as category_name, p.category_desc as category_desc, a.sub_name as sub_name FROM '+ this._table +' as p, sub_category as a WHERE p.sub_id = a.sub_id';
	this._conn.query(sql,callback);
}
CategoryDAO.prototype.ListSub = function(callback){
	this._conn.query('SELECT * FROM sub_category',callback);
}
CategoryDAO.prototype.Create = function(array,callback){
	var sql = 'INSERT INTO '+ this._table +' (sub_id, category_name ,category_desc) VALUES ?';
	var values = [[
	 	array.sub_id, 
	 	array.category_name,  
	 	array.category_desc  
	  ]];
	this._conn.query(sql,[values],callback);
}
CategoryDAO.prototype.Read = function(id,callback){
	this._conn.query('SELECT * FROM '+ this._table +' WHERE category_id = ?', id, callback);
}
CategoryDAO.prototype.ReadCatSubCat = function(id,callback){
	var sql = 'SELECT c.category_id as category_id,'+
			   'c.sub_id as sub_id,'+
			   'c.category_name as category_name,'+
			   'c.category_desc as category_desc,'+
			   'sb.sub_id as sub_id,'+
			   'sb.sub_name as sub_name '+
			   'FROM '+this._table+' as c, sub_category as sb '+
			   'WHERE c.sub_id = sb.sub_id AND category_id = ?';
		this._conn.query(sql,id,callback);
}
CategoryDAO.prototype.Update = function(array,callback){	
	this._conn.query('UPDATE '+ this._table +' SET ? WHERE category_id = ? ', [{
	  	sub_id: array.sub_id,
	  	category_name: array.category_name,
	  	category_desc: array.category_desc
	  },array.category_id], callback);	
}
CategoryDAO.prototype.Delete = function(id,callback){
	this._conn.query('DELETE FROM '+ this._table +' WHERE category_id = '+ id, callback);
}
module.exports = function(){
	return CategoryDAO;
}