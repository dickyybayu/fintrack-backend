const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running...');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

const walletRoutes = require('./routes/walletRoutes');
app.use('/api/wallets', walletRoutes);

const walletSnapshotRoutes = require('./routes/walletSnapshotRoutes');
app.use('/api/wallets/snapshots', walletSnapshotRoutes);
