const { getWalletSnapshotsForUser } = require("../services/WalletSnapshotService");

exports.getWalletSnapshots = async (req, res) => {
  try {

    const snapshots = await getWalletSnapshotsForUser(req.user.userId);

    res.json(snapshots);
  } catch (err) {
    console.error("Gagal ambil snapshot saldo:", err);
    res.status(500).json({ message: "Gagal mengambil snapshot saldo." });
  }
}