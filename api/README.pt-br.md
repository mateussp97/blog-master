# BlogMaster

O BlogMaster é uma aplicação de **gestão de usuários e postagens**.

A ferramenta permite que os administradores gerenciem usuários e que cada usuário crie, edite e visualize suas postagens.

## Requisitos

### Requisitos funcionais

- [x] O administrador deve poder cadastrar um novo usuário;
- [x] O administrador deve poder visualizar dados de um usuário;
- [x] O administrador deve poder visualizar a lista de usuários;
- [x] O usuário deve poder criar uma nova postagem;
- [x] O usuário deve poder visualizar suas postagens;
- [x] O usuário deve poder editar suas postagens;
- [x] O usuário deve poder deletar suas postagens;
- [x] O usuário deve poder visualizar apenas postagens publicadas;
- [x] O administrador deve poder visualizar todas as postagens;
- [x] O administrador deve poder deletar postagens;

### Regras de negócio

- [x] O usuário só pode criar postagens se estiver registrado;
- [x] A postagem só será publicada se o campo `published` estiver definido como `true`;
- [x] O usuário só pode editar ou deletar suas próprias postagens;

## Funcionalidades e Rotas da Aplicação

### Usuários

- **Cadastrar Usuário**

  - **Método:** POST
  - **Rota:** `/users`
  - **Descrição:** Cria um novo usuário.
  - **Exemplo de Payload:**
    ```json
    {
      "email": "johndoe@acme.com",
      "name": "John Doe"
    }
    ```

- **Visualizar Usuário**
  - **Método:** GET
  - **Rota:** `/users/:id`
  - **Descrição:** Retorna os dados de um usuário específico.
- **Visualizar Lista de Usuários**

  - **Método:** GET
  - **Rota:** `/users`
  - **Descrição:** Retorna a lista de todos os usuários registrados.

- **Editar Usuário**

  - **Método:** PATCH
  - **Rota:** `/users/:id`
  - **Descrição:** Atualiza os dados de um usuário específico.
  - **Exemplo de Payload:**
    ```json
    {
      "email": "johndoe@acme.com",
      "name": "Doe John"
    }
    ```

- **Deletar Usuário**
  - **Método:** DELETE
  - **Rota:** `/users/:id`
  - **Descrição:** Remove um usuário específico.

### Postagens

- **Criar Postagem**

  - **Método:** POST
  - **Rota:** `/posts`
  - **Descrição:** Cria uma nova postagem.
  - **Exemplo de Payload:**
    ```json
    {
      "title": "Automated CRUD with NestJS and Prisma",
      "content": "Learn how to create an automated CRUD with NestJS and Prisma.",
      "published": true,
      "authorEmail": "johndoe@acme.com"
    }
    ```

- **Visualizar Postagem**

  - **Método:** GET
  - **Rota:** `/posts/:id`
  - **Descrição:** Retorna os dados de uma postagem específica.

- **Visualizar Postagens Publicadas com Paginação**

  - **Método:** GET
  - **Rota:** `/posts/feed?page=1&limit=10`
  - **Descrição:** Retorna a lista de todas as postagens publicadas com paginação.

- **Visualizar Lista de Postagens com Paginação**

  - **Método:** GET
  - **Rota:** `/posts?page=1&limit=10`
  - **Descrição:** Retorna a lista de todas as postagens com paginação.

- **Editar Postagem**

  - **Método:** PATCH
  - **Rota:** `/posts/:id`
  - **Descrição:** Atualiza os dados de uma postagem específica.
  - **Exemplo de Payload:**
    ```json
    {
      "title": "Automated CRUD with NestJS and Prisma",
      "content": "Learn how to create an automated CRUD with NestJS and Prisma.",
      "published": false
    }
    ```

- **Publicar Postagem**

  - **Método:** PUT
  - **Rota:** `/posts/publish/:id`
  - **Descrição:** Publica uma postagem específica.

- **Deletar Postagem**
  - **Método:** DELETE
  - **Rota:** `/posts/:id`
  - **Descrição:** Remove uma postagem específica.
