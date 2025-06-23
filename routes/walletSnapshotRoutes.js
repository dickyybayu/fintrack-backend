const express = require('express');
const router = express.Router();
const walletSnapshotController = require('../controllers/walletSnapshotController');
const auth = require('../middleware/authMiddleware');

router.get("/", auth, walletSnapshotController.getWalletSnapshots);

module.exports = router;