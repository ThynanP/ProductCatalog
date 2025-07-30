Sobre o Projeto
Este projeto foi desenvolvido como uma demonstração completa de uma aplicação web moderna, seguindo as melhores práticas de desenvolvimento tanto no back-end quanto no front-end. Ele serve como um excelente template para projetos que necessitam de gerenciamento de dados e controle de acesso de usuários.
Funcionalidades
CRUD de Produtos: Funcionalidades completas para Criar, Ler, Atualizar e Deletar produtos.
Filtro Dinâmico: Pesquisa de produtos por nome e/ou categoria diretamente pela API.
Sistema de Usuários: Registro e Login de usuários.
Autenticação Segura: Implementação de autenticação via JSON Web Tokens (JWT), com senhas armazenadas de forma segura usando Hash e Salt.
Endpoints Protegidos: Apenas usuários autenticados podem adicionar, editar ou excluir produtos.
Interface Reativa: Front-end responsivo e elegante, construído com React e estilizado com CSS Modules.
Tecnologias Utilizadas
A aplicação é dividida em duas partes principais:
Back-end
.NET 8 (compatível com .NET 6+)
C#
API REST com [ApiController]
Entity Framework Core como ORM
Microsoft.AspNetCore.Authentication.JwtBearer para autenticação JWT
Front-end
React (com TypeScript)
React Router para roteamento
Axios para requisições HTTP
CSS Modules para estilização com escopo
Banco de Dados
SQL Server (pode ser facilmente adaptado para SQLite)
 Começando
Siga estas instruções para obter uma cópia do projeto e executá-lo em sua máquina local para desenvolvimento e testes.
Pré-requisitos
Antes de começar, garanta que você tem as seguintes ferramentas instaladas:
.NET SDK 8.0 ou superior
Generated sh
dotnet --version
Use code with caution.
Sh
Node.js e npm (v18.x ou superior recomendado)
Generated sh
node -v
npm -v
Use code with caution.
Sh
SQL Server (Express, Developer ou LocalDB)
Um editor de código como o Visual Studio Code
Ferramentas do EF Core (se não tiver instalado globalmente):
Generated sh
dotnet tool install --global dotnet-ef
Use code with caution.
Sh
Instalação e Execução
1. Configurando o Back-end
Generated bash
# 1. Clone o repositório
git clone https://seu-repositorio-aqui.git

# 2. Navegue para a pasta do back-end
cd caminho/do/projeto/Backend/ProductCatalog.Api

# 3. Configure a conexão com o banco e o token JWT
#    Abra o arquivo `appsettings.json` e altere os seguintes valores:
Use code with caution.
Bash
appsettings.json```json
{
"AppSettings": {
"Token": "esta é a minha chave secreta super longa e segura para gerar tokens"
},
"ConnectionStrings": {
"DefaultConnection": "Server=NOME_DO_SEU_SERVIDOR;Database=ProductCatalogDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
// ...
}
Generated code
```bash
# 4. Restaure os pacotes NuGet
dotnet restore

# 5. Crie o banco de dados e aplique as migrations
#    (Certifique-se de ter criado o banco "ProductCatalogDb" no seu SQL Server)
dotnet ef database update

# 6. Execute a API
dotnet run
Use code with caution.
✨ A API estará rodando, geralmente em http://localhost:5xxx. Anote a porta.
2. Configurando o Front-end
Generated bash
# 1. Em um novo terminal, navegue para a pasta do front-end
cd caminho/do/projeto/Frontend/product-catalog-web

# 2. Instale as dependências do npm
npm install

# 3. Configure a URL da API
#    Abra o arquivo `src/services/api.ts` e certifique-se de que a `baseURL`
#    aponta para a porta correta da sua API.
Use code with caution.
Bash
src/services/api.ts
Generated typescript
const api = axios.create({
  baseURL: 'http://localhost:5287/api', // <-- Verifique esta porta!
});
Use code with caution.
TypeScript
Generated bash
# 4. Execute a aplicação React
npm start
Use code with caution.
Bash
A aplicação web estará acessível em http://localhost:3000.
Endpoints da API
Abaixo está uma lista dos principais endpoints disponíveis.
Método	Endpoint	Descrição	Protegido
POST	/api/users/register	Registra um novo usuário.	Não
POST	/api/users/login	Autentica um usuário e retorna um token JWT.	Não
GET	/api/products	Lista todos os produtos. Aceita filtros.	Não
GET	/api/products/{id}	Retorna um produto específico pelo ID.	Não
POST	/api/products	Cria um novo produto.	Sim
PUT	/api/products/{id}	Atualiza um produto existente.	Sim
DELETE	/api/products/{id}	Exclui um produto.	Sim
📜 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.