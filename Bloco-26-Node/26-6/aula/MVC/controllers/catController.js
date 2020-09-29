const Cat = require('../models/catModel');

const listCats = async (req, res) => {
  const cats = await Cat.getAll();

  res.render('catList', { cats, message: null });
};

const newCat = async (req, res) => {
  const { name, age } = req.body;

  if (!Cat.isValid(name, age)) {
    return res
      .status(400)
      .send('<h2>O nome digitado ou a idade não são válidas</h2>');
  }

  await Cat.add(name, age);

  res.render('success', { name });
};

const catDetails = async (req, res) => {
  const { id } = req.params;

  const cat = await Cat.getCatById(id);

  if (!cat) {
    return res.status(404).render('notFound');
  }

  const { name, age } = cat;

  res.render('catDetails', { cat });
};

module.exports = {
  listCats,
  newCat,
  catDetails,
};
