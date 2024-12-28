import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/shop/cart-slice';
import { addReview, getReviews } from '@/store/shop/products-slice';
import StarRating from './starRating';

const HomeProductDetails = ({ isOpen, onClose, product }) => {
  if (!product) return null;

  const [rating, setRating] = useState(0); // For storing rating (0-5)
  const [comment, setComment] = useState(''); // For storing the comment
  const [reviews, setReviews] = useState([]); // Local state for fetched reviews
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id; // User ID from authentication state

  useEffect(() => {
    if (product) {
      // Fetch reviews when product changes or dialog opens
      dispatch(getReviews(product._id))
        .unwrap()
        .then((response) => {
          setReviews(response.reviews || []); // Assuming `reviews` is the field holding the review data
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [dispatch, product]);

  // Handle adding a product to the cart
  const handleAddToCart = () => {
    dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
  };

  // Handle adding a review
  const handleAddReview = async () => {
    if (rating <= 0 || !comment.trim()) {
      alert('Both rating and comment are required');
      return;
    }

    const reviewData = {
      productId: product._id,
      review: { rating, comment },
      userId,
    };

    try {
      const response = await dispatch(addReview(reviewData)).unwrap();
      setReviews((prevReviews) => [response.review, ...prevReviews]); // Add new review locally
      dispatch(getReviews(product._id))
      .unwrap()
      .then((response) => {
        setReviews(response.reviews || []); // Update the reviews list
      })
      dispatch(getReviews(product._id))
      .catch((error) => {
        console.error('Error fetching updated reviews:', error);
      });
      setRating(0); // Reset rating after submission
      setComment(''); // Reset comment after submission
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-w-screen-md p-6 shadow-xl">
          <div className="flex gap-6 mt-7 mb-7">
            {/* Image Column */}
            <div className="flex-shrink-0 w-2/5">
              <img
                className="w-full max-h-[400px] object-cover shadow-lg rounded-lg"
                src={product.image}
                alt={product.title}
              />
            </div>

            {/* Details Column */}
            <div className="flex-grow w-3/5">
              <div className="mb-4">
                <div className="text-3xl font-bold mb-2">{product.title}</div>
                <p className="text-xl font-semibold text-muted-foreground">
                  {product.description}
                </p>
                <div className="flex flex-row justify-between mb-4">
                  <p className="text-xl font-semibold line-through">
                    ${product.price}
                  </p>
                  <p className="text-xl font-semibold text-black">
                    ${product.salePrice}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>
              </div>
              <div>
                <Button className="w-full mb-4" onClick={handleAddToCart}>
                  Add to Cart
                </Button>

                <p className="font-bold mb-2">Reviews</p>
                <div className="h-[130px] overflow-y-auto">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review._id} className="flex flex-row items-center mb-3">
                        <Avatar className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                          <AvatarFallback className="bg-gray-200 text-black text-lg">
                            {review.user?.userName?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <h1 className="text-lg font-semibold">{review.user?.userName || 'Anonymous'}</h1>
                          <div className="flex flex-row items-center">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className={`h-5 w-5 ${
                                  index < review.rating ? 'text-yellow-500' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.374 2.448a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.374-2.448a1 1 0 00-1.175 0l-3.374 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.25 8.394c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.966z" />
                              </svg>
                            ))}
                          </div>
                          <p className="mt-1 text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet</p>
                  )}
                </div>

                <div className="flex flex-row gap-3 mt-3 justify-between">
                  <Input
                    placeholder="Give your review"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button onClick={handleAddReview}>Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default HomeProductDetails;
