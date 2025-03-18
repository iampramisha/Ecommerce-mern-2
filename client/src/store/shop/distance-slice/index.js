import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const openCageApiKey = '97cfbd17c94c4336a913919bb2ab9560'; // Replace with your OpenCage API key

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

// Function to calculate distance using OSRM
const calculateDistanceWithOSRM = async (userCoords, branchCoords) => {
  try {
    const url = `http://router.project-osrm.org/route/v1/driving/${userCoords.lon},${userCoords.lat};${branchCoords.lon},${branchCoords.lat}?overview=false`;
    const response = await axios.get(url);
    const distanceInMeters = response.data.routes[0].distance;
    const distanceInKm = distanceInMeters / 1000; // Convert to kilometers
    return distanceInKm;
  } catch (error) {
    console.error('Error calculating distance with OSRM:', error);
    throw error;
  }
};

// Function to calculate cost per km based on distance
const getCostPerKm = (distance) => {
  if (distance <= 70) {
    return 10; // Within city (e.g., Kathmandu) - Lower cost per km for short distances
  } else if (distance <= 500) {
    // Linear interpolation between 70 km and 500 km
    const minDistance = 70;
    const maxDistance = 500;
    const minCost = 1.5; // Cost at 70 km
    const maxCost = 1.02; // Cost at 500 km

    // Calculate the cost per km using linear interpolation
    return minCost + ((maxCost - minCost) * (distance - minDistance)) / (maxDistance - minDistance);
  } else {
    return 1; // Remote areas - Lower cost per km for longer distances
  }
};
// Function to calculate cost per kg based on weight
const getCostPerKg = (weight) => {
  if (weight <= 1) {
    return 10; // 0–1 kg
  } else if (weight <= 5) {
    return 20; // 1–5 kg
  } else {
    return 50; // 5+ kg
  }
};

export const fetchNearestBranch = createAsyncThunk(
  'distance/fetchNearestBranch',
  async ({ address, city, productWeight, sellerBranches }) => {
    try {
      // Get user coordinates
      const userCoordinates = await getCoordinates(`${address}, ${city}`);
      console.log("User Coordinates:", userCoordinates);

      // Calculate distances to all seller branches
      const distances = await Promise.all(
        sellerBranches.map(async (branch) => {
          const branchCoords = await getCoordinates(branch); // Pass the branch string directly
          const distance = await calculateDistanceWithOSRM(userCoordinates, branchCoords);
          return { branch, distance };
        })
      );

      // Find the nearest branch
      const nearestBranch = distances.reduce((prev, curr) =>
        prev.distance < curr.distance ? prev : curr
      );

      // Calculate dynamic cost per km and cost per kg
      const costPerKm = getCostPerKm(nearestBranch.distance); // Dynamic cost per km
      const costPerKg = getCostPerKg(productWeight); // Dynamic cost per kg

      // Log values for debugging
      console.log(`Nearest Branch: ${nearestBranch.branch}`);
      console.log(`Distance: ${nearestBranch.distance}`);
      console.log(`Product Weight: ${productWeight}`);
      console.log(`Cost Per Km: NPR ${costPerKm}`);
      console.log(`Cost Per Kg: NPR ${costPerKg}`);

      // Calculate total shipping cost based on distance and weight
      const shippingCost =
        (nearestBranch.distance * costPerKm || 0) +
        (productWeight * costPerKg || 0);

      console.log(`Total Shipping Cost: NPR ${shippingCost.toFixed(2)}`);

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