const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 },
  type: { type: String, enum: ['Tunai', 'Bank', 'E-wallet', 'Investasi'], required: true }
});

module.exports = mongoose.model('Wallet', WalletSchema);
