const express = require('express');
const bodyParder = require('body-parser');
const catController = require('./controllers/catController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParder.urlencoded({ extended: true }));

// Busca todos os gatos
app.get('/cats', catController.listCats);

// Cria um gato
app.post('/cats', catController.newCat);

// Mostra os detalhes do gato 
app.get('/cats/:id', catController.catDetails);

app.listen(3000, () => { console.log(`Ouvindo na porta 3000!`) });
