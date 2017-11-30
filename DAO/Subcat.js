function CategoryDAO(conn){
	this._table = 'sub_category';
	this._conn = conn;
}
CategoryDAO.prototype.ListAll = function(callback){
	sql = 'SELECT p.sub_id as sub_id, p.sub_name as sub_name, p.sub_desc as sub_desc FROM '+ this._table +' as p ';
	this._conn.query(sql,callback);
}
CategoryDAO.prototype.Create = function(array,callback){
	var sql = 'INSERT INTO '+ this._table +' (sub_name ,sub_desc) VALUES ?';
	var values = [[
	 	array.sub_name,  
	 	array.sub_desc  
	  ]];
	this._conn.query(sql,[values],callback);
}
CategoryDAO.prototype.Read = function(id,callback){
	this._conn.query('SELECT * FROM '+ this._table +' WHERE sub_id = ?', id, callback);
}
CategoryDAO.prototype.Update = function(array,callback){	
	this._conn.query('UPDATE '+ this._table +' SET ? WHERE sub_id = ? ', [{
	  	sub_name: array.sub_name,
	  	sub_desc: array.sub_desc
	  },array.sub_id], callback);	
}
CategoryDAO.prototype.Delete = function(id,callback){
	this._conn.query('DELETE FROM '+ this._table +' WHERE sub_id = '+ id, callback);
}
module.exports = function(){
	return CategoryDAO;
}