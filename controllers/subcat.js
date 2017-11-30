module.exports = function(app){		
	var SubCatControll = {
		index: function(req,res){
			res.render('subcat/index', {title : 'Sub Categoria'});
		},
		view: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var SubModel  = require('../DAO/Subcat')();
			var Subcat = new SubModel(conn);
			
			Subcat.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					res.render('subcat/view', {subcat: results, title : results[0].sub_name});
					conn.end();
				}
			})			
		},	
		read: function(req,res){
			var conn  = require('../config/mysql')();
			var SubModel  = require('../DAO/Subcat')();
			var Subcat = new SubModel(conn);			
			Subcat.ListAll(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.render('subcat/consulta',{subcats: results,title: 'Consultar Sub Categoria'});				
					conn.end();
				}							
			});			
		},
		form: function(req,res){
			res.render('subcat/form', {form:'create',subcat:[[]] , title : 'Cadastrar Sub Categoria'});
		},
		create: function(req,res){
			var array = req.body;
			var validatorTitle = req.assert('sub_name','Nome é Obrigatório').notEmpty();
			var error_v = req.validationErrors();
			if(error_v){
				console.log(error_v);
				res.render('subcat/form', {form:'create',subcat:[array], erroValidator: error_v, title : 'Cadastrar Sub Categoria'});
			return;
			}else{
				var conn  = require('../config/mysql')();
				var SubModel  = require('../DAO/Subcat')();
				var Subcat = new SubModel(conn);
				Subcat.Create(array, function(error, results){
					if (error) {
						console.log(error);
					}else{
						res.redirect('/sub_cat/consulta');
					}
				});	
			conn.end();
			}						
		},
		update: function(req,res){
			var array = req.body;
			var validatorTitle = req.assert('sub_name','Nome é Obrigatório').notEmpty();
			var error_v = req.validationErrors();
			if(error_v){
				console.log(error_v);
				res.render('subcat/form', {form:'update',erroValidator: error_v, subcat:[array], title : 'Atualizar Sub Categoria'});
				return;
			}else{
				var conn  = require('../config/mysql')();
				var SubModel  = require('../DAO/Subcat')();
				var Subcat = new SubModel(conn);
				Subcat.Update(array ,function(error,results){
					if(error){
						console.log(error);
					}else{
						res.redirect('/sub_cat/consulta');
						conn.end();
					}
				});
			}
		},
		view_form: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var SubModel  = require('../DAO/Subcat')();
			var Subcat = new SubModel(conn);
			Subcat.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					res.render('subcat/form', {form:'update',subcat:results, title : 'Atualizar Sub Categoria'});
					conn.end();
				}
			})			
		},
		delete:function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var SubModel  = require('../DAO/Subcat')();
			var Subcat = new SubModel(conn);		
			Subcat.Delete(id,function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.redirect('/sub_cat/consulta');
					conn.end();
				}
			});						
		}				
	}
	return SubCatControll;
}