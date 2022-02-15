const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedCategory) {
      res.status(404).json({message: 'No Category found with that ID'});
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delCategory) {
      res.status(404).json({message: 'No category found with that ID!'});
      return;
    }
    res.status(200).json(delCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
