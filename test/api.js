var app  = require('../config/express')();
var load = require('express-load');
load('controllers').then('DAO').then('routes').into(app);
var request = require('supertest')(app);
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mysql');
describe('API Tester',function(){	
	beforeEach(function(done){
		var conn  = require('../config/mysql')();
		databaseCleaner.clean(conn, function(err,result){
			if(!err){
				done();
			}
		});
	});
	it('Listing of post',function(done){
		request.get('/post/consulta')
		.set('Accept', 'application/json')
        .expect('Content-Type', /json/)
		.expect(200,done);
	});
	it('Listing of author',function(done){
		request.get('/author/consulta')
		.set('Accept', 'application/json')
        .expect('Content-Type', /json/)
		.expect(200,done);
	});
	it('Listing of category',function(done){
		request.get('/category/consulta')
		.set('Accept', 'application/json')
        .expect('Content-Type', /json/)
		.expect(200,done);
	});
});