const express = require('express');
const app = express();
const porta = 8080;
const db = require('./models/db');
const Login = require('./models/Login');

app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(200).render('inicio');
});

app.post('/cadastrar', async (req, res) => {
    await Login.create(req.body).then(() => {
        console.log('Usuário criado com sucesso.');
    }).catch(() => {
        console.log('Não foi possível cadastrar o usuário.');
    })

    res.status(201).send('Hello, World!');
})

app.listen(porta, () => {
    console.log(`Porta ${porta} rodando.`);
});