const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryTable = await Category.findAll({
    include: [Product]
  })
    res.json(categoryTable)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id,{
    include: [Product]
  })
  res.json(category)
});

router.post('/', async (req, res) => {
  // create a new category
  const category = await Category.create(req.body)
  res.json(category);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where: {
      id: req.params.id
    }
  }).then(function(category){
    res.json(category)
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(deleteCategory)
});

module.exports = router;
