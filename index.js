const express = require('express');
const app = express();
const porta = 8080;
const db = require('./models/db');
const Login = require('./models/Login');

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(200).render('inicio');
});

app.post('/cadastrar', async (req, res) => {
    Login.findOne({where: {email: req.body.email}}).then((existe) => {
        if(existe){
            res.send('Esse usuário já existe.');
        } else{
            Login.create(req.body).then(() => {
                console.log('Usuário criado com sucesso.');
            }).catch(() => {
                console.log('Não foi possível cadastrar o usuário.');
            });
        
            res.redirect('/logins');
        }
    });
});

app.get('/loginsAPI', async (req, res) => {
    await Login.findAll().then((logins) => {
        res.status(200).send(logins);
    });
});

app.get('/logins', async (req, res) => {
    res.status(200).render('paginaLogins');
});

app.get('/logins/excluir/:id', async (req, res) => {
    const id = req.params.id;

    res.status(200).render('excluir', {id: id});
});

app.get('/excluir/:id', async (req, res) => {
    const id = req.params.id;

    Login.findByPk(id).then((usuario) => {
        if(usuario){
            usuario.destroy({
                where: {id: id}
            }).then(() => {
                res.render('excluido');
            }).catch(() => {
                res.send('Não foi possível excluir o usuário.');
            });
        }
    })
});

app.get('/logins/editar/:id', async (req, res) => {
    const id = req.params.id;

    res.status(200).render('editar', {id: id});
});

app.post('/editar/:id', async (req, res) => {
    const id = req.params.id;
    
    Login.findByPk(id).then((usuario) => {
        if(usuario){
            usuario.update({
                email: req.body.email,
                senha: req.body.senha
            }).then(() => {
                res.render('editado');
            }).catch(() => {
                res.send('Não foi possível editar esse usuário.');
            })
        }
    })
})


app.listen(porta, () => {
    console.log(`Porta ${porta} rodando.`);
});