// controllers/propertyController.js
const Property = require('../models/Property');

exports.postProperty = async (req, res) => {
    const { area, place, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
    try {
        const newProperty = new Property({
            seller: req.user.id,
            area,
            place,
            bedrooms,
            bathrooms,
            nearbyHospitals,
            nearbyColleges
        });
        await newProperty.save();
        res.status(201).json({ message: 'Property posted successfully', property: newProperty });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to post property' });
    }
};

exports.getPropertiesExcludingUser = async (req, res) => {
    try {
        const properties = await Property.find({ seller: { $ne: req.user.id } }).populate('seller', 'email phone');
        console.log(properties);
        res.json({ properties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
};



exports.updateProperty = async (req, res) => {
    const { id } = req.params;
    const { area, place, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
    try {
        const property = await Property.findOneAndUpdate(
            { _id: id, seller: req.user.id },
            { area, place, bedrooms, bathrooms, nearbyHospitals, nearbyColleges },
            { new: true }
        );
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json({ message: 'Property updated successfully', property });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update property' });
    }
};

exports.deleteProperty = async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findOneAndDelete({ _id: id, seller: req.user.id });
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete property' });
    }
};

exports.getMyPosts = async (req, res) => {
    try {
        // Find properties posted by the logged-in user
        const properties = await Property.find({ seller: req.user.id });
        console.log(properties);
        res.status(200).json({ properties });
    } catch (error) {
        console.error('Failed to fetch properties:', error);
        res.status(500).json({ message: 'Failed to fetch properties' });
    }
};