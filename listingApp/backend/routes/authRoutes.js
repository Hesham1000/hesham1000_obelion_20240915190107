const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// POST /register
router.post('/register', async (req, res) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;