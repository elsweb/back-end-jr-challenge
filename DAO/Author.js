function AuthorDAO(conn){
	this._table = 'author';
	this._conn = conn;
}
AuthorDAO.prototype.ListAll = function(callback){
	this._conn.query('SELECT * FROM '+ this._table +'',callback);
}
AuthorDAO.prototype.Create = function(array,callback){
	var sql = 'INSERT INTO '+ this._table +' (author_name, author_desc) VALUES ?';
	var values = [[
	  array.author_name,
	  array.author_desc  
	  ]];
	this._conn.query(sql,[values],callback);
}
AuthorDAO.prototype.Read = function(id,callback){
	this._conn.query('SELECT * FROM '+ this._table +' WHERE author_id = ?', id, callback);
}
AuthorDAO.prototype.Update = function(array,callback){	
	this._conn.query('UPDATE '+ this._table +' SET ? WHERE author_id = ? ', [{
	  	author_name: array.author_name,
	  	author_desc: array.author_desc,
	  },array.author_id], callback);	
}
AuthorDAO.prototype.Delete = function(id,callback){
	this._conn.query('DELETE FROM '+ this._table +' WHERE author_id = "'+ id +'"', callback);
}
module.exports = function(){
	return AuthorDAO;
}