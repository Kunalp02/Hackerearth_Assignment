// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { postProperty, getPropertiesExcludingUser,getMyPosts, updateProperty, deleteProperty } = require('../controllers/propertyController');
const auth = require('../middleware/auth');

router.post('/', auth, postProperty);
router.get('/', auth, getPropertiesExcludingUser);
router.get('/my-posts', auth, getMyPosts);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

module.exports = router;
