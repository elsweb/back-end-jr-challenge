module.exports = function(app){
	var subcat =  app.controllers.subcat;
	app.route('/sub_cat').get(subcat.index);
	app.route('/sub_cat/view/:id').get(subcat.view);
	app.route('/sub_cat/consulta').get(subcat.read);
	app.route('/sub_cat/cadastro').get(subcat.form);
	app.route('/sub_cat/create').post(subcat.create);
	app.route('/sub_cat/remove/:id').get(subcat.delete);
	app.route('/sub_cat/cadastro/:id').get(subcat.view_form);
	app.route('/sub_cat/update/').post(subcat.update);	
}