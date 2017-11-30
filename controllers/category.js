module.exports = function(app){		
	var CategoryControll = {
		index: function(req,res){
			res.render('category/index', {title : 'Categoria'});
		},
		view: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var CategoryModel  = require('../DAO/Category')();
			var Category = new CategoryModel(conn);
			
			Category.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					res.render('category/view', {category: results, title : results[0].category_name});
					conn.end();
				}
			})			
		},	
		read: function(req,res){
			var conn  = require('../config/mysql')();
			var CategoryModel  = require('../DAO/Category')();
			var Category = new CategoryModel(conn);			
			Category.ListAll(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.format({
						html:function(){
							res.render('category/consulta',{categorys: results,title: 'Consultar Categoria'});				
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
			var conn  = require('../config/mysql')();
			var CategoryModel  = require('../DAO/Category')();
			var Category = new CategoryModel(conn);			
			Category.ListSub(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.render('category/form', {form:'create',category:[[]], sub_cat: results, title : 'Cadastrar Categoria'});
					conn.end();
				}							
			});
		},
		create: function(req,res){
			var array = req.body;
			var validatorTitle = req.assert('category_name','Nome é Obrigatório').notEmpty();
			var error_v = req.validationErrors();
			if(error_v){
				var conn  = require('../config/mysql')();
				var CategoryModel  = require('../DAO/Category')();
				var Category = new CategoryModel(conn);			
				Category.ListSub(function(error, results){
					if (error) {
						console.log(error);
					}else{
						res.render('category/form', {form:'create',erroValidator: error_v,category:[array], sub_cat: results, title : 'Cadastrar Categoria'});
						conn.end();
					}							
				});
			return;
			}else{
				var conn  = require('../config/mysql')();
				var CategoryModel  = require('../DAO/Category')();
				var Category = new CategoryModel(conn);
				Category.Create(array, function(error, results){
					if (error) {
						console.log(error);
					}else{
						conn.end();
						res.redirect('/category/consulta');
					}
				});	
			}						
		},
		update: function(req,res){
			var array = req.body;
			var validatorTitle = req.assert('category_name','Nome é Obrigatório').notEmpty();
			var error_v = req.validationErrors();
			if(error_v){
				var conn  = require('../config/mysql')();
				var CategoryModel  = require('../DAO/Category')();
				var Category = new CategoryModel(conn);
				Category.ListSub(function(error, results){
					if (error) {
						console.log(error);
					}else{
						res.render('category/form', {form:'create',erroValidator: error_v,category:[array], sub_cat: results, title : 'Atualizar Categoria'});
						conn.end();
					}							
				});
			return;
			}else{
				var conn  = require('../config/mysql')();
				var CategoryModel  = require('../DAO/Category')();
				var Category = new CategoryModel(conn);	
					Category.Update(array ,function(error,results){
						if(error){
							console.log(error);
						}else{
							conn.end();
							res.redirect('/category/consulta');					
						}
					});
			}			
		},
		view_form: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var CategoryModel  = require('../DAO/Category')();
			var Category = new CategoryModel(conn);	
			Category.ReadCatSubCat(id,function(error,results_a){
				if (error) {
					console.log(error);
				}else{
					Category.ListSub(function(error, results_b){
						if (error) {
							console.log(error);
						}else{
							res.render('category/form', {form:'update',category:results_a, sub_cat: results_b, title : 'Cadastrar Categoria'});
							conn.end();
						}
					});
				}
			})			
		},
		delete:function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var CategoryModel  = require('../DAO/Category')();
			var Category = new CategoryModel(conn);			
			Category.Delete(id,function(error, results){
				if (error) {
					console.log(error);
				}else{
					conn.end();
					res.redirect('/category/consulta');					
				}
			});						
		}				
	}
	return CategoryControll;
}