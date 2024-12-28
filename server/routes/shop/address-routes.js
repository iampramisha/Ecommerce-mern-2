const express = require('express');
const { addAddress, getAddress, deleteAddress, updateAddress, getAddressById } = require('../../controllers/shop/address-controller');
const router = express.Router();

router.post('/', addAddress); // Add new address
router.get('/:userId', getAddress); // Get all addresses by userId
router.get('/address/:userId/:addressId', getAddressById); // Get a specific address by addressId
router.put('/:userId/:addressId', updateAddress); // Update an address by addressId
router.delete('/:userId/:addressId', deleteAddress); // Delete an address by addressId

module.exports = router;
