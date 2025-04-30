const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = express.Router();

router.post('/api/users/teams/by-sport/', async (req, res) => {
    const { access } = req.cookies;
    const body = JSON.stringify(req.body);

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/teams/by-sport/`, {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body
        });

        const data = await apiRes.json();
        console.log("Data received from API:", data);
        return res.status(apiRes.status).json(data);

    } catch (err) {
        return res.status(500).json({
            error: 'Nešto je pošlo  krivo kod Create /users/teams/by-sport/'
        });
    }

});

module.exports = router;