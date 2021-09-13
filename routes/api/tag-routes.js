const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try{
  const allTags = await Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag
    }]
  })
  res.json(allTags)
}catch (error){ 
  res.status(500).json(error)
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag
      }]
    } )
    res.json(singleTag)
  }catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
try {
  const newTag = await Tag.create(req.body)
  res.json(newTag)
}catch (error){
res.status(500).json(error)
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

try {
const newId = await Tag.update(req.body, {
  where: {
    id: req.params.id,
  }  
})
  res.json(newId)
}
catch(error){
  console.log(error)
res.status(500).json(error)
}

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
try{
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(deletedTag)
}

catch(error){
res.status(500).json(error)
}
});

module.exports = router;
