const Wallet = require('../models/Wallet');

exports.getWallets = async (userId) => {
  return await Wallet.find({ user: userId });
};

exports.addWallet = async (userId, { name, balance, type }) => {
  if (!name) throw new Error("Nama wallet wajib diisi");
  const wallet = new Wallet({
    user: userId,
    name,
    balance: balance || 0,
    type: type
  });
  await wallet.save();
  return wallet;
};

exports.updateWallet = async (userId, walletId, { name, balance, type }) => {
  if (!name) throw new Error("Nama wallet wajib diisi");
  const wallet = await Wallet.findOneAndUpdate(
    { _id: walletId, user: userId },
    { name, balance, type },
    { new: true }
  );
  if (!wallet) throw new Error("Wallet tidak ditemukan atau tidak milik pengguna");
  
  return wallet;
}

exports.deleteWallet = async (userId, walletId) => {
  await Wallet.deleteOne({ _id: walletId, user: userId });
  return { msg: "Wallet berhasil dihapus" };
};
