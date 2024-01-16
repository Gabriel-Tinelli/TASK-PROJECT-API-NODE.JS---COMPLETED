//Importação da Framework e do modulo db que faz a conexção com o mysql

import express from 'express';
import db from '../config/db-config.js';

// Cria a instancia para rotas do express
const router = express.Router();

//* Get Tasks

//Definição da rota GET!
//res -> Resquest = Requisição HTTP feita pelo cliente ao servidor
//req -> Response = Resposta que será enviada do servidor para o cliente
router.get('/task', (req, res) => {
    db.query('SELECT * FROM tasktb', (err, results) => { //estou requisitando que o servidor através do GET por uma função de callback de tudo que esta no mysql
        if (err) throw err; // verifica se tem erro, caso tenha a função throw vai interromper o codigo
        res.json(results);
    });
});

// Get Tasks por ID

router.get('/task/:id', (req, res) => { 
    const { id } = req.params; //faz a destruturação do objeto (Extrai valores) através do 'const id = req.params.id;'
    db.query('SELECT * FROM tasktb WHERE task_id = ?', [id], (err, results) => { // Utiliza a conexão com o banco de dados (db) para realizar uma consulta SQL
        if (err) throw err;
        res.json(results[0]);
    });
});

//POST!
//* Criar nova task

router.post('/task', (req, res) => { //define rota HTTP usandoe express, quando faz a requisição POST, a função callback é iniciada
    const { task_title, task_description } = req.body; //extrai da requisição JSON o task_title, task_description
    const task_created = new Date(); //cria uma nova data com base no horario do seu pc
    const task_completed = null; //preenche automaticamente os dados para evitar burlar
    const task_updated = null; ////preenche automaticamente os dados para evitar burlar
    db.query('INSERT INTO tasktb (task_title, task_description, task_completed, task_created, task_updated) VALUES (?, ?, ?, ?, ?)', //Usa a conexão com o banco de dados (db) para inserir uma nova linha na tabela tasktb com os valores fornecidos.
    [task_title, task_description, task_completed, task_created, task_updated], (err) => {
        if (err) throw err;
        res.json({ message: 'Task adicionada com sucesso!'});
    });
});

// atualizar Task

router.put('/task/:id', (req, res) => {
    const { id } = req.params;
    const {task_title, task_description} = req.body;
    const task_updated = new Date();

    db.query('UPDATE tasktb SET task_title = ?, task_description = ?, task_updated = ? WHERE task_id = ?', [task_title, task_description, task_updated, id], (err) => {
        if (err) throw err;
        res.json({ message:'Task atualizada com sucesso!'});
    });
});

// deletar task

router.delete('/task/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM tasktb WHERE task_id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Task excluida com sucesso!'})
    })
})

// completar task

router.put('/task/completed/:id', (req, res) => {
    const { id } = req.params; //faz a destruturação do objeto
    const task_completed = new Date(); //atualiza de acordo com o PUT na rota indicada

    db.query('UPDATE tasktb SET task_completed = ? WHERE task_id', [task_completed, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Task concluída com sucesso!'})
    })
})

export default router;