const { getWalletSnapshotsForUser } = require("../services/WalletSnapshotService");

exports.getWalletSnapshots = async (req, res) => {
  try {
    console.log("USER ID dari JWT:", req.user.userId);

    const snapshots = await getWalletSnapshotsForUser(req.user.userId);

    console.log("Snapshots hasilnya:", snapshots);

    res.json(snapshots);
  } catch (err) {
    console.error("Gagal ambil snapshot saldo:", err);
    res.status(500).json({ message: "Gagal mengambil snapshot saldo." });
  }
}