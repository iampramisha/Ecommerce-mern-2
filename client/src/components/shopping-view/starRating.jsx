import React from 'react';
import { Star } from 'lucide-react'; // Assuming you're using the 'lucide-react' icons for the star.

const StarRating = ({ onRatingChange, rating }) => {
  const handleStarClick = (index) => {
    onRatingChange(index + 1); // Set the rating to the clicked star index + 1 (rating 1 to 5)
  };

  return (
    <div className="flex flex-row items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={index < rating ? 'fill-primary' : 'fill-gray-300'} // Fill color for filled and unfilled stars
          onClick={() => handleStarClick(index)} // Click to set rating
          style={{ cursor: 'pointer', marginRight: '5px' }}
        />
      ))}
    </div>
  );
};

export default StarRating;
