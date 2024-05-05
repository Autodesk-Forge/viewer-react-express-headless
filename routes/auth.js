const express = require('express');
const { getPublicToken } = require('../server/aps');

let router = express.Router();

router.get('/token', async function (req, res, next) {
    try {
         res.json(await getPublicToken());
    } catch (err) {
        next(err);
    }
});

module.exports = router;