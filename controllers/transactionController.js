const transactionService = require('../services/transactionService');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions(req.user.userId);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.addTransaction(req.user.userId, req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const updatedTx = await transactionService.updateTransaction(req.user.userId, req.params.id, req.body);
    res.json(updatedTx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const result = await transactionService.deleteTransaction(req.user.userId, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
