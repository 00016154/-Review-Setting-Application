const express = require('express');
const { validationResult } = require('express-validator');
const { addReviewValidation, updateReviewValidation,
   deleteReviewValidation } = require('../../../validators/review');

const router = express.Router();
const review_controller = require('../../../controllers/api/review');

// Define API routes
router.get('/', (req, res)=>{
    review_controller.getAll(req, res);
});

router.post('/', addReviewValidation(), (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    review_controller.create(req, res)
})

router.put('/:id', updateReviewValidation(), (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  }
  review_controller.update(req, res) 
  })

router.delete('/:id', deleteReviewValidation(), (req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  review_controller.delete(req, res)
})

module.exports = router;