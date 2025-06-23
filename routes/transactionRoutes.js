const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transactionController');

router.get('/', authMiddleware, transactionController.getTransactions);
router.post('/', authMiddleware, transactionController.addTransaction);
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);
router.put('/:id', authMiddleware, transactionController.updateTransaction);

module.exports = router;
