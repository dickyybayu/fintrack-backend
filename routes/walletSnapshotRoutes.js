const express = require('express');
const router = express.Router();
const walletSnapshotController = require('../controllers/WalletSnapshotController');
const auth = require('../middleware/authMiddleware');

router.get("/", auth, walletSnapshotController.getWalletSnapshots);

module.exports = router;