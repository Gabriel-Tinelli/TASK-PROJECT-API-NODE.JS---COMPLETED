import fs from 'fs';
import csv from 'csv-parser';
import db from './db-config.js';

// Caminho para o arquivo CSV
const filePath = '../import/lista.csv';

// Array para armazenar as tarefas do CSV
const tasks = [];

// Ler o arquivo CSV
fs.createReadStream(filePath, { encoding: 'utf-8' })
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
        // Ajustar o formato da data para o MySQL (YYYY-MM-DD HH:MM:SS)
        const task = {
            task_title: row.task_title,
            task_description: row.task_description,
            task_completed: row.task_completed,
            task_created: row.task_created.replace('T', ' ').replace('Z', ''),
            task_updated: row.task_updated.replace('T', ' ').replace('Z', '')
        };
        tasks.push(task);
    })
    .on('end', () => {
        // Após ler todo o arquivo CSV, inserir os dados no banco de dados
        insertTasksIntoDatabase();
    });

// Função para inserir tarefas no banco de dados
function insertTasksIntoDatabase() {
    const sql = 'INSERT INTO tasktb (task_title, task_description, task_completed, task_created, task_updated) VALUES ?';

    // Mapear o array tasks para um array de arrays (cada array representa uma linha)
    const values = tasks.map(task => [
        task.task_title,
        task.task_description,
        task.task_completed,
        task.task_created,
        task.task_updated
    ]);

    // Executar a consulta SQL
    db.query(sql, [values], (err, results) => {
        if (err) {
            console.error('Erro ao inserir tarefas no banco de dados:', err);
        } else {
            console.log('Tarefas importadas com sucesso!');
        }

        // Fechar a conexão com o banco de dados
        db.end();
    });
}