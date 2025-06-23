const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

