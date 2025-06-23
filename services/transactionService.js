const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');

exports.getTransactions = async (userId) => {
  return await Transaction.find({ user: userId }).sort({ date: -1 });
};

exports.addTransaction = async (userId, { amount, type, category, wallet, description, date }) => {
  if (!['income', 'expense'].includes(type)) {
    throw new Error('Tipe transaksi tidak valid');
  }
  if (amount <= 0) {
    throw new Error('Jumlah transaksi harus lebih dari 0');
  }

  const walletDoc = await Wallet.findById(wallet);
  if (!walletDoc) throw new Error('Wallet tidak ditemukan');

  if (type === 'expense' && amount > walletDoc.balance) {
    throw new Error('Saldo dompet tidak mencukupi untuk pengeluaran ini');
  }

  const transaction = new Transaction({
    user: userId,
    wallet,
    amount,
    type,
    category,
    description,
    date
  });
  await transaction.save();

  walletDoc.balance += type === 'income' ? amount : -amount;
  await walletDoc.save();

  return transaction;
};

exports.updateTransaction = async (userId, transactionId, updatedData) => {
  const existingTx = await Transaction.findOne({ _id: transactionId, user: userId });
  if (!existingTx) throw new Error('Transaksi tidak ditemukan');

  const oldWallet = await Wallet.findById(existingTx.wallet);
  if (!oldWallet) throw new Error('Dompet lama tidak ditemukan');

  oldWallet.balance += existingTx.type === 'income' ? -existingTx.amount : existingTx.amount;
  await oldWallet.save();

  const { amount, type, category, wallet, description, date } = updatedData;
  if (!['income', 'expense'].includes(type)) {
    throw new Error('Tipe transaksi tidak valid');
  }
  if (amount <= 0) {
    throw new Error('Jumlah transaksi harus lebih dari 0');
  }

  const newWallet = await Wallet.findById(wallet);
  if (!newWallet) throw new Error('Dompet baru tidak ditemukan');

  if (type === 'expense' && amount > newWallet.balance) {
    throw new Error('Saldo dompet tidak mencukupi untuk pengeluaran ini');
  }

  newWallet.balance += type === 'income' ? amount : -amount;
  await newWallet.save();

  existingTx.amount = amount;
  existingTx.type = type;
  existingTx.category = category;
  existingTx.wallet = wallet;
  existingTx.description = description;
  existingTx.date = date;

  await existingTx.save();

  return existingTx;
};


exports.deleteTransaction = async (userId, transactionId) => {
  const tx = await Transaction.findOne({ _id: transactionId, user: userId });
  if (!tx) throw new Error('Transaksi tidak ditemukan');

  const walletDoc = await Wallet.findById(tx.wallet);
  if (walletDoc) {
    walletDoc.balance += tx.type === 'income' ? -tx.amount : tx.amount;
    await walletDoc.save();
  }

  await tx.deleteOne();
  return { msg: 'Transaksi dihapus dan saldo dikembalikan' };
};
