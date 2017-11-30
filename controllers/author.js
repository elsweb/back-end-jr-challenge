module.exports = function(app){		
	var PostControll = {
		index: function(req,res){
			res.render('author/index', {title : 'Autor'});
		},
		view: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);
			
			Author.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					res.render('author/view', {author: results, title : results[0].author_name});
					conn.end();
				}
			})			
		},	
		read: function(req,res){
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);			
			Author.ListAll(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.format({
						html:function(){
							res.render('author/consulta',{authors: results,title: 'Consultar Autor'});				
							conn.end();
						},
						json:function(){
							res.json(results);
							conn.end();
						}
					});	
				}							
			});			
		},
		form: function(req,res){
			res.render('author/form', {form:'create',author:[[]], title : 'Cadastrar Autor'});
		},
		create: function(req,res){
			var array = req.body;
			var validatorTitle = req.assert('author_name','Título é Obrigatório').notEmpty();
			var error_v = req.validationErrors();
				if(error_v){
					res.render('author/form',{form:'create',author:[array] , erroValidator: error_v, title : 'Cadastrar Autor'});
				return;
				}else{
					var conn  = require('../config/mysql')();
					var AuthorModel  = require('../DAO/Author')();
					var Author = new AuthorModel(conn);	
					Author.Create(array, function(error, results){
						if (error) {
							console.log(error);
						}else{
							conn.end();
							res.redirect('/author/consulta');
						}
					});
				}			
		},
		update: function(req,res){
			var array = req.body;
			var validatorTitle = req.assert('author_name','Título é Obrigatório').notEmpty();
			var error_v = req.validationErrors();
			if(error_v){
				res.render('author/form', {author: [array], form:'update', erroValidator: error_v, title : 'Atualizar Postagem'});
			}else{
				var conn  = require('../config/mysql')();
				var AuthorModel  = require('../DAO/Author')();
				var Author = new AuthorModel(conn);	
				Author.Update(array ,function(error,results){
						if(error){
							console.log(error);
						}else{
							conn.end();
							res.redirect('/author/consulta');					
						}
					});
			}
			
		},
		view_form: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);
			Author.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					res.render('author/form', {author: results, form:'update', title : 'Atualizar Postagem'});
					conn.end();
				}
			})			
		},
		delete:function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);		
			Author.Delete(id,function(error, results){
				if (error) {
					console.log(error);
				}else{
					conn.end();
					res.redirect('/author/consulta');					
				}
			});						
		}				
	}
	return PostControll;
}