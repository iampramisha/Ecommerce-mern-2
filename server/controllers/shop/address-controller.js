const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {
      const { userId, address, city, pinCode, phone, notes } = req.body;
  
      const newAddress = new Address({
        userId,
        address,
        city,
        pinCode,
        phone,
        notes
      });
  
      await newAddress.save();
      return res.status(201).json({ message: 'Address added successfully', address: newAddress });
    } catch (error) {
      return res.status(500).json({ error: 'Error adding address', details: error.message });
    }
  };
  const getAddress = async (req, res) => {
    try {
      const { userId } = req.params; 
      const addresses = await Address.find({ userId });
      return res.status(200).json({ addresses });
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching addresses', details: error.message });
    }
  };
  
  const getAddressById = async (req, res) => {
    try {
      const { addressId } = req.params;
  
      const address = await Address.findById(addressId);
      if (!address) {
        return res.status(404).json({ error: 'Address not found' });
      }
  
      return res.status(200).json({ address });
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching address', details: error.message });
    }
  };
  const updateAddress = async (req, res) => {
    try {
      const { addressId } = req.params;
      const { address, city, pinCode, phone, notes } = req.body;
  
      // Only allow updating these fields
      const updateData = { address, city, pinCode, phone, notes };
  
      const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        updateData,
        { new: true }
      );
  
      if (!updatedAddress) {
        return res.status(404).json({ error: 'Address not found' });
      }
  
      return res.status(200).json({
        message: 'Address updated successfully',
        address: updatedAddress
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Error updating address',
        details: error.message
      });
    }
  };
  const deleteAddress = async (req, res) => {
    try {
      const { addressId } = req.params;
  
      const deletedAddress = await Address.findByIdAndDelete(addressId);
      if (!deletedAddress) {
        return res.status(404).json({ error: 'Address not found' });
      }
  
      return res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting address', details: error.message });
    }
  };
    module.exports={addAddress, getAddress, getAddressById, updateAddress, deleteAddress};