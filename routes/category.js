module.exports = function(app){
	var category =  app.controllers.category;
	app.route('/category').get(category.index);
	app.route('/category/view/:id').get(category.view);
	app.route('/category/consulta').get(category.read);
	app.route('/category/cadastro').get(category.form);
	app.route('/category/create').post(category.create);
	app.route('/category/remove/:id').get(category.delete);
	app.route('/category/cadastro/:id').get(category.view_form);
	app.route('/category/update/').post(category.update);	
}