const Sequelize = require('sequelize');
const db = require('./db');

const Login = db.define('cadastros', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Login.sync();

module.exports = Login;