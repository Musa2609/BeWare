const express = require('express');
const { scanEmail, analyzeAd, getScanHistory } = require('../controllers/scanController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.post('/email', scanEmail);
router.post('/ad', analyzeAd);
router.get('/history', getScanHistory);

module.exports = router;