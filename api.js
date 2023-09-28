const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario_mysql',
    password: 'sua_senha_mysql',
    database: 'nome_do_seu_banco_de_dados'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conexão ao MySQL estabelecida com sucesso.');
    }
});

// Rota para cadastrar um usuário
app.post('/api/cadastrar-usuario', (req, res) => {
    const novoUsuario = req.body;
    db.query('INSERT INTO usuarios SET ?', novoUsuario, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).json({ error: 'Erro ao cadastrar usuário' });
        } else {
            console.log('Usuário cadastrado com sucesso.');
            res.json({ message: 'Usuário cadastrado com sucesso' });
        }
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
