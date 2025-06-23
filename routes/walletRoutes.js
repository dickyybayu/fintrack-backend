const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const walletController = require('../controllers/walletController');

router.get('/', authMiddleware, walletController.getWallets);
router.post('/', authMiddleware, walletController.addWallet);
router.put('/:id', authMiddleware, walletController.updateWallet);
router.delete('/:id', authMiddleware, walletController.deleteWallet);

module.exports = router;
