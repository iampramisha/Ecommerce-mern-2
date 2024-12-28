const express = require('express');
const axios = require('axios');

const directionsRouter = express.Router();

directionsRouter.get('/directions', async (req, res) => {
    const { start, end } = req.query;
    console.log('OpenRouteService API Key:', process.env.OPENROUTESERVICE_API_KEY);
    console.log('Start coordinates:', start);
    console.log('End coordinates:', end);
    
    // Split the coordinates and convert them to floats
    const startCoordinates = start.split(',').map(coord => parseFloat(coord.trim()));
    const endCoordinates = end.split(',').map(coord => parseFloat(coord.trim()));

    // Check if coordinates are valid numbers
    if (startCoordinates.length !== 2 || endCoordinates.length !== 2 || 
        startCoordinates.some(isNaN) || endCoordinates.some(isNaN)) {
        return res.status(400).json({ message: 'Invalid coordinates format' });
    }

    try {
        // Make the request to the OpenRouteService API for directions
        const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
            params: {
                start: startCoordinates.join(','), // Sending as a comma-separated string
                end: endCoordinates.join(','),     // Sending as a comma-separated string
            },
            headers: {
                Authorization: process.env.OPENROUTESERVICE_API_KEY, // Set the API key in headers
            }
        });

        // Assuming you have a way to define the branch
        const branch = {}; // Define or fetch your branch object

        if (response.data.routes && response.data.routes.length > 0) {
            return res.json({
                name: branch.name, // Make sure branch is defined and available
                distance: response.data.routes[0].summary.distance,
            });
        } else {
            console.error(`No routes found for coordinates: ${startCoordinates} to ${endCoordinates}`);
            return res.json({ name: branch.name, distance: Infinity });
        }
    } catch (error) {
        console.error(`Error fetching directions from ${startCoordinates} to ${endCoordinates}:`, error.response ? error.response.data : error.message);
        return res.status(500).json({ message: 'Error fetching directions', error: error.message });
    }
});

module.exports = directionsRouter;
