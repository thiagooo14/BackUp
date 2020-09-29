// Parei na minutagem 54:36

const express = require('express');
const bodyParder = require('body-parser');
const mysqlx = require('@mysql/xdevapi');

const app = express();

app.use(bodyParder.urlencoded({ extended: true }));

const connection = () => {
  return mysqlx
  .getSession({
    user: 'root',
    password: '042666',
    host: 'localhost',
    port: 33060,
  })
  .then((session) => session.getSchema('preatty_cats'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

app.get('/cats', async (req, res) => {
  try{
    const db = await connection();
    const results = await db.getTable('cats').select(['name', 'age']).execute();

    const cats = results.fetchAll();

    const content = cats.reduce((html, cat) => {
      const [name, age] = cat;
      return html + `<li>nome: ${name} - Idade: ${age}</li>`;
    }, '');
    
    const htmlBase = `
    <html>
      <head>
        <title>Gatos</title>
      </head>
      <body>
        <ul style="background-color: antiquewhite">
          ${content}
        </ul>
        <form action="/cats" method="POST">
          <input name="name" type="text">
          <input name="age" type="number">
          <button type="submit">Criar novo gato!</button>
        </form>
      </body>
    </html>
    `
    res.send(htmlBase);
  } catch (err) {
    console.error(err);
    res.status(500).send('<h2>Erro ao tentar realizar a operação<h2>')
  }
});

app.post('/cats', async (req, res) => {
  const { name, age } = req.body;

  if (typeof name !== 'string' || name.length < 3 || name.length >= 21){
    return res.status(400).send(`<h2>O nome digitado não é válido.</h2>`);
  }
  try{
    const db = await connection();
    await db
    .getTable('cats')
    .insert(['name', 'age'])
    .values(name, age)
    .execute();

    res.send('<h2>Gato criado com sucesso!</h2>');
  } catch (err) {
    console.error(err);
    res.status(500).send('<h2>Erro ao criar o gato.</h2>');
  }
});

app.get('/cats/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connection();
    const results = await db
      .getTable('cats')
      .select(['name', 'age'])
      .where('id = :id')
      .bind('id', id)
      .execute();

    const cat = results.fetchAll()[0];

    if (!cat) {
      return res.status(404).send('<h2>Gato não encontrado :</h2>');
    }

    const [name, age] = cat;
    const content = `<h2>Nome: ${name} - Idade: ${age}</h2>`;
    const htmlBase = `
      <html>
        <header>
          <title>Detalhes</title>
        </header>
        <body>
          <div style="background-color: antiquewhite">
            ${content}
          </div>
        </body>
      </html>
    `;
    
    res.send(htmlBase);
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro ao tentar realizar operação</h2>');
  }
});

app.listen(3000, () => { console.log(`Ouvindo na porta 3000!`) });
