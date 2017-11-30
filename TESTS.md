# AUTOMATED TESTS #

- Testes realizados com MOCHA
	- Para realizar testes automatizados use o mocha, a seguir os comandos:
	- NODE_ENV=dev node_modules/mocha/bin/mocha
- ATENÇÃO
	- Crie uma répica do banco
	- Configure no arquivo config/mysql.js
	- Não se esqueça de usar a váriavel NODE_ENV=dev, pois eu implementei um
	sistema para limpar TODAS as tabelas do banco de dados. 