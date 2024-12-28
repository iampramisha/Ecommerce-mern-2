import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const openCageApiKey = '97cfbd17c94c4336a913919bb2ab9560'; // Replace with your OpenCage API key

const branches = [
  { name: 'Kathmandu', lat: 27.7172, lon: 85.324 },
  { name: 'Bhaktapur', lat: 27.7165, lon: 85.4285 },
  { name: 'Lalitpur', lat: 27.6719, lon: 85.324 },
  { name: 'Pokhara', lat: 28.2096, lon: 83.9856 },
  { name: 'Biratnagar', lat: 26.4486, lon: 87.2713 },
  { name: 'Janakpur', lat: 26.7276, lon: 85.9339 },
  { name: 'Nepalgunj', lat: 28.1635, lon: 81.6529 },
  { name: 'Bharatpur', lat: 27.6848, lon: 84.4426 },
  { name: 'Dhangadhi', lat: 28.6954, lon: 80.5782 },
  { name: 'Hetauda', lat: 27.4163, lon: 84.2637 },
  { name: 'Birgunj', lat: 27.0005, lon: 84.8593 },
  { name: 'Itahari', lat: 26.6557, lon: 87.2834 },
  { name: 'Ghorahi', lat: 28.6005, lon: 82.4515 },
  { name: 'Damak', lat: 26.6473, lon: 87.4183 },
  { name: 'Banepa', lat: 27.3669, lon: 85.5026 },
  { name: 'Kirtipur', lat: 27.6514, lon: 85.2523 },
  { name: 'Tulsipur', lat: 28.6901, lon: 82.5407 },
  { name: 'Rajbiraj', lat: 26.2227, lon: 86.0665 },
  { name: 'Sindhuli', lat: 27.0833, lon: 80.6000 },
  { name: 'Surkhet', lat: 28.5932, lon: 81.6281 },
  { name: 'Rautahat', lat: 27.2339, lon: 84.7667 },
];

// Function to get coordinates from an address using OpenCage API
const getCoordinates = async (address) => {
    try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: address,
                key: openCageApiKey,
                limit: 1,
            },
        });
        
        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry; // Get latitude and longitude
            return { lat, lon: lng };
        } else {
            throw new Error('No results found for the provided address');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error; // Rethrow the error for handling in the thunk
    }
};

// Haversine function to calculate distance between two coordinates
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};
export const fetchNearestBranch = createAsyncThunk(
  'distance/fetchNearestBranch',
  async ({ address, city, productWeight }) => {
    try {
      const userCoordinates = await getCoordinates(`${address}, ${city}`);
      console.log("User Coordinates:", userCoordinates);

      const distances = branches.map((branch) => {
        const distance = haversineDistance(
          userCoordinates.lat,
          userCoordinates.lon,
          branch.lat,
          branch.lon
        );
        return { branch, distance };
      });

      const nearestBranch = distances.reduce((prev, curr) =>
        prev.distance < curr.distance ? prev : curr
      );

      const costPerKm = 20; // Cost per km
      const costPerKg = 5;   // Cost per kg

      // Log values for debugging
      console.log(`Nearest Branch: ${nearestBranch.branch.name}`);
      console.log(`Distance: ${nearestBranch.distance}`);
      console.log(`Product Weight: ${productWeight}`);

      // Calculate total shipping cost based on distance and weight
      const shippingCost = 
        (nearestBranch.distance * costPerKm || 0) + 
        (productWeight * costPerKg || 0);

      console.log(`Total Shipping Cost: $${shippingCost.toFixed(2)}`);

      return {
        nearestBranch: nearestBranch.branch,
        shippingCost: shippingCost.toFixed(2), // Save as string for consistency
        distance: nearestBranch.distance.toFixed(2), // Include nearest distance in km for display
      };
    } catch (error) {
      console.error("Error in fetching nearest branch:", error.message);
      throw error; // Throw the error to be handled in the extraReducer
    }
  }
);

// Redux slice to manage the state
const distanceSlice = createSlice({
    name: 'distance',
    initialState: {
        nearestBranch: null,
        shippingCost: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNearestBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNearestBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.nearestBranch = action.payload.nearestBranch;
                state.shippingCost = action.payload.shippingCost;
            })
            .addCase(fetchNearestBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default distanceSlice.reducer;
