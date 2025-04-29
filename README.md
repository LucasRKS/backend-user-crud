# CRUD de Usuários (Backend)

Este projeto é um backend para um CRUD (Create, Read, Update, Delete) voltado para o gerenciamento de usuários. Foi desenvolvido utilizando o **NestJS** e implementa autenticação com **JWT**. O banco de dados utilizado é o **PostgreSQL**.

---

## Tecnologias Utilizadas

- **NestJS**: Framework para Node.js, utilizado para a criação da API.
- **TypeORM**: ORM para interação com o banco de dados.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados.
- **JWT (JSON Web Tokens)**: Utilizado para autenticação.
- **Bcrypt.js**: Biblioteca para criptografar as senhas dos usuários.
- **Swagger**: Ferramenta para documentação da API.

---

## Docker

- Existe um docker-compose na raiz do projeto, para doar execute o comando docker-compose up -d, ele criará o banco e também um usuário base para utilizar a aplicação.

## Envs

- Crie um arquivo .env com base no .env.examplo (TO-DO: Utilizar docker para isso) e preencha com as variaveis necessárias.

## Start

- Rode o comando npm start ou start:dev para que a aplicação seja iniciada.

## Login

- email: teste@exemplo.com
- senha: 123456

## Frontend

Ainda em desenvolvimento (utilizando ReactJS com next).
