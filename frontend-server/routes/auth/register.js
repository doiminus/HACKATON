const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = express.Router();

router.post('/api/users/register', async (req, res) => {
    console.log('Incoming registration data from frontend:', req.body);

    const { first_name, last_name, email, password } = req.body;

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        is_realtor: "false",
        qr: "false"
    });

    console.log(process.env.API_URL);

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body
        });

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);

    } catch (err) {
        console.error(' Error talking to Django:', err.message);
        return res.status(500).json({
            error: 'Nešto je pošlo ka zlu tokom registracije'
        });
    }
});

module.exports = router;