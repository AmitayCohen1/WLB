const requireAuth = require("../middlewares/requireAuth");
const express = require('express');
const router = express.Router();

router.get('/', requireAuth)

module.exports = router;