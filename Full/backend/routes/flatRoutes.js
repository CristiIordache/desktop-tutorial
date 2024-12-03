const express = require('express');
const { getFlats, createFlat, updateFlat, deleteFlat } = require('../controllers/flatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getFlats);
router.post('/', authMiddleware, createFlat);
router.put('/:id', authMiddleware, updateFlat);
router.delete('/:id', authMiddleware, deleteFlat);

module.exports = router;
