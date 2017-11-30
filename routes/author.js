module.exports = function(app){
	var author =  app.controllers.author;
	app.route('/author').get(author.index);
	app.route('/author/view/:id').get(author.view);
	app.route('/author/consulta').get(author.read);
	app.route('/author/cadastro').get(author.form);
	app.route('/author/create').post(author.create);
	app.route('/author/remove/:id').get(author.delete);
	app.route('/author/cadastro/:id').get(author.view_form);
	app.route('/author/update/').post(author.update);	
}