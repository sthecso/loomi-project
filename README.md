# Loomi Project
Backend challenge

API Rest para um sistema de gerenciamento de e-commerce com usuário admin, cliente, produtos e pedidos.

### Recommendations
-Criando uma conta Mailtrap(https://mailtrap.io/) e usando as seu user e senha no caminho do arquivo descrito abaixo, você poderá ter acesso ao fluxo de email quando um usuário admin ou cliente forem cadastrados.
```
loomi-project    
│
└───src
│   │
|   └───utils
│           └─── sendEmail.ts
```

### Installing

1. Clone esse repositório para sua máquina

    `git clone git@github.com:sthecso/loomi-project.git`

2. Instale as dependências

    `npm install`
  
3. Crie um arquivo .env com a seguinte variável de ambiente

   `DATABASE_URL="postgresql://postgres:postgres22@localhost:5432/loomiStore?schema=public"`
 
4. Inicie o banco de dados utilizando o Docker

    `npm run compose:up`
  
5. Inicie a aplicação

    `npm start`


