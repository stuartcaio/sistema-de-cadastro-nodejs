import express from 'express';
const app = express();
const porta = 8080;

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

app.listen(porta, () => {
    console.log(`Porta ${porta} rodando.`);
})