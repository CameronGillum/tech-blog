const router = require('express').Router();
const userRoutes = require('./blogRoutes');

router.use('/users', userRoutes);

module.exports = router;
