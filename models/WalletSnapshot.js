const mongoose = require('mongoose');

const walletSnapshotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

walletSnapshotSchema.index({ user: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('WalletSnapshot', walletSnapshotSchema);
