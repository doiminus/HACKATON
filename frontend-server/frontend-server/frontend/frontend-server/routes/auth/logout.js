const express = require('express');
const router = express.Router();

// prazna ruta
router.post('/api/users/logout', (req, res) => {
    res.status(200).json({ message: 'Logout route placeholder' });
});

module.exports = router;