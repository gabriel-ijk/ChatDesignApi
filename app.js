const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const roomsRouter = require('./routes/rooms');


const app = express();

// Configurar EJS como o template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar pasta pública para CSS e JS
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));  // Configura o diretório público para arquivos estáticos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.use(authRouter);
app.use('/rooms', roomsRouter);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
