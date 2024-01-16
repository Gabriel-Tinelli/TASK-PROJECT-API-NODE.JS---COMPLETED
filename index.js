//* Importação de Framework e módulos
import express from 'express';
import router from './api/endpoints.js';
import db from './config/db-config.js';

//*Servidor

//Criando uma instância chamada app através do Express rodar um servidor web que atende solicitações HTTP
const app = express();

//Criando uma constante chamada PORT que utiliza a variável ambiente process.env.PORT, por padrão está executando a porta 3000
const PORT = process.env.PORT || 3000;

// Adiciona um middleware ao aplicativo Express para analisar automaticamente o corpo das solicitações como JSON
app.use(express.json());

//*DataBase

//Estabelece a conexão com o banco de dados MySQL usando a função connect do objeto db. Exibe mensagens de erro ou de sucesso no console.
db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no mysql:', err);
      return;
    }
    console.log('Conectado no mysql database');
  });


//*Web
//aqui adicionamos a rota através do modulo router
app.use('/', router);

//Inicia o servidor
app.listen(PORT, () => {
    console.log(' Servidor conectado')
  });

//* Curiosidades
// app.use -> é um metodo do framework Express em Node.js que é usado para adicionar middleware a um app (aplicativo)
//O middleware é uma função que tem acesso tanto ao objeto de solicitação (req) quanto ao objeto de resposta (res) no ciclo de vida de uma solicitação HTTP.
