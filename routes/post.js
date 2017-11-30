module.exports = function(app){
	var post =  app.controllers.post;
	app.route('/post').get(post.index);
	app.route('/post/view/:id').get(post.view);
	app.route('/post/view_rtn/:id').get(post.view_rtn);
	app.route('/post/view/:id').post(post.cat_add);
	app.route('/post/consulta').get(post.read);
	app.route('/post/cadastro').get(post.form);
	app.route('/post/create').post(post.create);
	app.route('/post/remove/:id').get(post.delete);
	app.route('/post/cadastro/:id').get(post.view_form);
	app.route('/post/update/').post(post.update);	
}