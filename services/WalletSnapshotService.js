const Wallet = require('../models/Wallet');
const WalletSnapshot = require('../models/WalletSnapshot');

exports.getWalletSnapshotsForUser = async (userId) => {
  const snapshots = await WalletSnapshot.find({ user: userId });

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const alreadySnapshotted = snapshots.some(s => s.month === currentMonth);

  if (!alreadySnapshotted) {
    const wallets = await Wallet.find({ user: userId });
    const currentBalance = wallets.reduce((sum, w) => sum + w.balance, 0);

    const newSnapshot = new WalletSnapshot({
      user: userId,
      month: currentMonth,
      balance: currentBalance,
    });

    await newSnapshot.save();

    snapshots.push(newSnapshot); 
  }

  const result = snapshots.map(s => ({
    month: s.month,
    total_balance: s.balance,
  }));

  result.sort((a, b) => new Date(a.month + '-01') - new Date(b.month + '-01'));

  return result;
};
