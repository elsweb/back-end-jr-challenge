module.exports = function(app){		
	var PostControll = {
		index: function(req,res){
			res.render('post/index', {title : 'Postagem'});
		},
		view: function(req,res){
			var id = req.params.id;
			var array = req.body;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var AuthorModel  = require('../DAO/Author')();
			var CategoryModel  = require('../DAO/Category')();
			var Author = new AuthorModel(conn);
			var Post = new PostModel(conn);
			var Category = new CategoryModel(conn);
			Post.Read(id,function(error_p,results_p){
				if (error_p) {
					console.log(error_p);
				}else{
					//Count Post Views
					var count = results_p[0].post_view == 'NULL' ? 1 : results_p[0].post_view + 1 ;
					Post.UpdateView(id,count,function(error_c,results_c){});
					Author.ListAll(function(error_a, result_a){
						if (error_a) {
							console.log(error_a);
						}else{
							//List Category
							Category.ListAll(function(error_cat, results_cat){
								if (error_cat){
									console.log(error_cat);
								}else{
									Post.ListCat(id,function(error_pc,results_pc){
									res.render('post/view', {post: results_p, author: result_a, cat: results_cat, p_cat:results_pc ,title : results_p[0].post_title});
									conn.end();
								});
								}
							});						
						}
					});	
				}
			})			
		},
		view_rtn: function(req,res){
			var id = req.params.id;
			var array = req.body;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var AuthorModel  = require('../DAO/Author')();
			var CategoryModel  = require('../DAO/Category')();
			var Author = new AuthorModel(conn);
			var Post = new PostModel(conn);
			var Category = new CategoryModel(conn);
			Post.Read(id,function(error_p,results_p){
				if (error_p) {
					console.log(error_p);
				}else{
					//Count Post Views
					Author.ListAll(function(error_a, result_a){
						if (error_a) {
							console.log(error_a);
						}else{
							//List Category
							Category.ListAll(function(error_cat, results_cat){
								if (error_cat){
									console.log(error_cat);
								}else{
									Post.ListCat(id,function(error_pc,results_pc){
									res.render('post/view', {post: results_p, author: result_a, cat: results_cat, p_cat:results_pc ,title : results_p[0].post_title});
									conn.end();
								});
								}
							});							
						}
					});	
				}
			})

		},
		cat_add: function(req,res){
			var array = req.body;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);
			console.log(array);
			Post.CheckCat(array,function(error,results){
				if(results[0].count_cat == 0){
					Post.AddCat(array,function(error,results){
						if(error){
							console.log(error);
						}else{
							res.redirect('/post/view_rtn/'+array.post_id);
							conn.end();
							return;
						}								
				})
				}else{
					var msg = 'Categoria já cadastrada';
					var AuthorModel  = require('../DAO/Author')();
					var CategoryModel  = require('../DAO/Category')();
					var Author = new AuthorModel(conn);
					var Category = new CategoryModel(conn);
					Post.Read(array.post_id,function(error_p,results_p){
					if (error_p) {
						console.log(error_p);
					}else{
						//Count Post Views
						Author.ListAll(function(error_a, result_a){
							if (error_a) {
								console.log(error_a);
							}else{
								//List Category
								Category.ListAll(function(error_cat, results_cat){
									if (error_cat){
										console.log(error_cat);
									}else{
										Post.ListCat(array.post_id,function(error_pc,results_pc){
										res.render('post/view', {post: results_p, author: result_a, cat: results_cat, p_cat:results_pc,msg:msg ,title : results_p[0].post_title});
										conn.end();
									});
									}
								});							
							}
						});	
					}
				})
				}
			})			
		},
		read: function(req,res){
			var qurl = require('url').parse(req.url,true).query;
			var Promise = require('bluebird');
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var moment = require('moment');
			var Post = new PostModel(conn);
			//Pagination vars
			var queryPagination;
 			var numPerPage = parseInt(req.query.npp, 10) || 3;
  			var page = parseInt(req.query.page, 10) || 0;
  			var numPages;
  			var skip = page * numPerPage;
  			var end_limit = numPerPage;
 			var limit = skip + ',' + end_limit;
  			Post.Count(function(error_count, results_count){
				if(error_count){
					console.log(error_count);
				}else{
				  numPages = Math.ceil(results_count[0].Rows / numPerPage);
				  Post.ListAll(qurl,limit,function(error_p, results_p){
				  		if(error_p){
				  			console.log(error_p);
				  		}else{
				  			var responsePayload = {results: results_p};
				  			if (page < numPages) {
        						responsePayload.pagination = {
        						current: page,
        						perPage: numPerPage,
        						previous: page > 0 ? page - 1 : undefined,
        						next: page < numPages - 1 ? page + 1 : undefined
      							}
   							 }else responsePayload.pagination = {
        						err: 'O número máximo e páginas são ' + numPages
      						}
      						res.format({
								html:function(){
									var AuthorModel = require('../DAO/Author')();
									var Author = new AuthorModel(conn);
									Author.ListAll(function(error_a, results_a){
										if(error_a){
											console.log(results_a);
										}else{
											var CategoryModel = require('../DAO/Category')();
											var Category = new CategoryModel(conn);
											Category.ListAll(function(error_cat,results_cat){
												if(error_cat){
													console.log(error_cat);
												}else{
													res.render('post/consulta',{posts:results_p,author:results_a , cat:results_cat, pg:page, title:'Consultar Postagem',moment:moment});
													conn.end();	
												}
											})
										}
										
									});
								},
								json:function(){
									res.json(results_p);
									conn.end();
								}
							});	
				  		}
				  })
				}
			})	
		},
		form: function(req,res){
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);
			Author.ListAll(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.render('post/form', {form:'create',post:[[]], author: results, title : 'Cadastrar Postagem'});
					conn.end();
				}
			});	
		},
		create: function(req,res){
			var array = req.body;
			var conn  = require('../config/mysql')();
			var validatorTitle = req.assert('post_title','Título é Obrigatório').notEmpty();
			var error_v = req.validationErrors();			
			res.format({
				html: function(){
					if(error_v){
						var AuthorModel  = require('../DAO/Author')();
						var Author = new AuthorModel(conn);
						Author.ListAll(function(error_a, results_a){
							if (error_a) {
								console.log(error_a);
							}else{
								res.status(400).render('post/form', {form:'create', erroValidator: error_v, post:[array], author: results_a, title : 'Cadastrar Postagem'});
								return;
								conn.end();
							}
						});
					return;
					}else{
						var PostModel  = require('../DAO/Post')();
						var Post = new PostModel(conn);
						Post.Create(array, function(error, results){
							if (error) {
								console.log(error);
							}else{
								conn.end();
								res.redirect('/post/consulta');	
							}
						});
					}
				},
				json: function(){
					var PostModel  = require('../DAO/Post')();
					var Post = new PostModel(conn);
					Post.Create(array, function(error, results){
						if (error) {
							res.status(400).json(error);
						}else{
							res.status(200).json('Cadastrado com Sucesso');
							conn.end();
						}
					});
				}
			});									
		},
		update: function(req,res){
			var array = req.body;
			var validatorTitle = req.assert('post_title','Título é Obrigatório').notEmpty();
			var error_v = req.validationErrors();
			if(error_v){
				var conn  = require('../config/mysql')();
				var PostModel  = require('../DAO/Post')();
				var Post = new PostModel(conn);
				var AuthorModel  = require('../DAO/Author')();
				var Author = new AuthorModel(conn);
				Author.ListAll(function(error_a, result_a){
					if (error_a) {
						console.log(error_a);
					}else{
						console.log(error_v);
						res.render('post/form', {post: [array], author: result_a, erroValidator: error_v, form:'update', title : 'Atualizar Postagem'});
						conn.end();								
					}
				});
			}else{
				var conn  = require('../config/mysql')();
				var PostModel  = require('../DAO/Post')();
				var Post = new PostModel(conn);
				Post.Update(array ,function(error,results){
					if(error){
						console.log(error);
					}else{
						conn.end();
						res.redirect('/post/consulta');						
					}
				});
			}
		},
		view_form: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);

			Post.ReadPostAuthor(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					Author.ListAll(function(error, result){
						if (error) {
							console.log(error);
						}else{
							console.log(results);
							res.render('post/form', {post: results, author: result, form:'update', title : 'Atualizar Postagem'});
							conn.end();
						}
					});	
				}
			})			
		},
		delete:function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);			
			Post.Delete(id,function(error, results){
				if (error) {
					console.log(error);
				}else{
					conn.end();
					res.redirect('/post/consulta');					
				}
			});						
		}				
	}
	return PostControll;
}