# Back-end JR Challenge #

Esse desafio tem o objetivo de testar algumas habilidades em back-end.

## O desafio

Criar uma API em NodeJS que forneça um serviço para um blog. A API deve utilizar um banco de dados a sua escolha. 

O blog consiste nas seguintes entidades:

- Autor 
	- É importante saber o nome e uma breve descrição de cada autor
	- Um autor pode escrever várias postagens

- Postagem
	- Em cada postagem é importante saber o título, o conteúdo, a data, as categorias, o autor e a quantidade de vezes que a postagem foi exibida.
	- Uma postagem possuí apenas um autor, mas pode pertencer a várias categorias.

- Categoria
	- É importante saber o nome de cada categoria.
	- Categorias podem ter sub-categorias


A API deve implementar as seguintes features:

- CRUD Autor.
	- Deve ser possível Cadastrar/Ver/Alterar/Apagar um autor específico.
	- Deve ser possível listar todos os autores.

- CRUD Postagem.
	- Deve ser possível Cadastrar/Ver/Alterar/Apagar uma postagem específica.

- CRUD Categoria.
	- Deve ser possível Cadastrar/Ver/Alterar/Apagar uma categoria específica.
	- Deve ser possível listar todas as categorias.

- Listar todos as postagens de um determinado autor ou categoria.

- Os resultados de listagem devem ter parâmetros para paginar os resultados.

- Todas as requisições devem retornar os resultados em JSON


### Instruções ###

- Forke esse repositório e faça seu desafio numa branch chamada ```seunome_ano-mes-dia``` (use dois dígitos para as informações numéricas).
- Crie um arquivo DATABASE.md com as instruções para replicar o banco.
- Crie um arquivo INSTRUCTIONS.md com as instruções para replicar e executar sua API.
- Crie um arquivo ROUTES.md com todas as rotas(urls) para interagir com a sua API.
- Assim que concluído o desafio, abra um pull request com suas alterações e envie um email para [tecnologia@sejaspot.com.br](mailto:tecnologia@sejaspot.com.br) entitulado ```Desafio Back-End Jr``` contendo o link para o pull request.

### Considerações Gerais

- Crie um arquivo COMMENTS.md no seu fork para registrar suas reflexões, decisões, escolhas e os porquês.
- Comente o código.
- Automatize o máximo possível.
- Use ferramentas e bibliotecas open source, mas documente as decisões e os porquês.
- Você é livre para definir a modelagem e organização das features a serem implementadas.


### O que será avaliado ###

- Organização do projeto.
- Simplicidade da implementação.
- Modelagem do Banco de Dados.
- Qualidade do código.
- Utilização correta dos status HTTP (200, 404, 500, etc...)
- Processo de build.
- Qualidade dos testes (é um diferencial).
- Em caso de dúvida, envie um email para [tecnologia@sejaspot.com.br](mailto:tecnologia@sejaspot.com.br).

Boa sorte!
