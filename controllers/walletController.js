const walletService = require('../services/walletService');

exports.getWallets = async (req, res) => {
  try {
    const wallets = await walletService.getWallets(req.user.userId);
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addWallet = async (req, res) => {
  try {
    const wallet = await walletService.addWallet(req.user.userId, req.body);
    res.status(201).json(wallet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateWallet = async (req, res) => {
  try {
    const wallet = await walletService.updateWallet(req.user.userId, req.params.id, req.body);
    res.json(wallet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.deleteWallet = async (req, res) => {
  try {
    const result = await walletService.deleteWallet(req.user.userId, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
