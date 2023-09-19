const express = require('express');
const { generateUrl, redirectToUrl, checkUrl } = require('../controllers/urlController');
const router = express.Router();

router.post('/generate', generateUrl);
router.post('/redirect', redirectToUrl);
router.post('/checkurl', checkUrl);

module.exports = router;
