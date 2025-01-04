// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogPortal, DialogOverlay, DialogContent } from '@/components/ui/dialog';
// // import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
// // import { Button } from '@/components/ui/button';
// import { Star } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import StarRating from './starRating';
// import { addReview, fetchProductDetails, getReviews } from '@/store/shop/products-slice';
// import { addToCart } from '@/store/shop/cart-slice';
// import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '../ui/input';
// const ProductDetailDialog = ({ isOpen, onClose, productId }) => {
//     const [product, setProduct] = useState(null);
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [reviews, setReviews] = useState([]);
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.auth);
//     const userId = user?.id;

//     const [loading, setLoading] = useState(true);

//     // Fetch product details
//     useEffect(() => {
//         if (productId) {
//             setLoading(true);
//             dispatch(fetchProductDetails(productId))
//                 .unwrap()
//                 .then((response) => {
//                     console.log('Product response:', response);
//                     setProduct(response.data);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching product details:', error);
//                     setLoading(false);
//                 });
//         }
//     }, [dispatch, productId]);

//     // Fetch reviews only when product is loaded
//     useEffect(() => {
//         if (product && product._id) {
//             setLoading(true);
//             dispatch(getReviews(product._id))
//                 .unwrap()
//                 .then((response) => {
//                     console.log('Reviews response:', response);
//                     setReviews(response.reviews || []);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching reviews:', error);
//                     setLoading(false);
//                 });
//         }
//     }, [dispatch, product]);

//     const handleAddToCart = () => {
//         if (product) {
//             dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
//         }
//     };

//     const handleAddReview = async () => {
//         if (rating <= 0 || !comment.trim()) {
//             alert('Both rating and comment are required');
//             return;
//         }

//         const reviewData = {
//             productId: product._id,
//             review: { rating, comment },
//             userId,
//         };

//         try {
//             const response = await dispatch(addReview(reviewData)).unwrap();
//             const newReview = {
//                 ...response.review,
//                 user: {
//                     userName: user?.userName,
//                 },
//             };

//             setReviews((prevReviews) => [newReview, ...prevReviews]);
//             setRating(0);
//             setComment('');
//         } catch (error) {
//             console.error('Error adding review:', error);
//         }
//     };

//     if (loading) {
//         return <p></p>;
//     }

//     return (
//       <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogPortal>
//         <DialogOverlay />
//         <DialogContent className="max-w-screen-md p-6 shadow-xl">
//           <div className="flex gap-6 mt-7 mb-7">
//             {/* Image Column */}
//             <div className="flex-shrink-0 w-2/5">
//               <img
//                 className="w-full max-h-[400px] object-cover shadow-lg rounded-lg"
//                 src={product.image}
//                 alt={product.title}
//               />
//             </div>

//             {/* Details Column */}
//             <div className="flex-grow w-3/5">
//               <div className="mb-4">
//                 <div className="text-3xl font-bold mb-2">{product.title}</div>
//                 <p className="text-xl font-semibold text-muted-foreground">
//                   {product.description}
//                 </p>
//                 <div className="flex flex-row justify-between mb-4">
//                   <p className="text-xl font-semibold line-through">
//                     ${product.price}
//                   </p>
//                   <p className="text-xl font-semibold text-black">
//                     ${product.salePrice}
//                   </p>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <StarRating rating={rating} onRatingChange={setRating} />
//                 </div>
//               </div>
//               <div>
//                 <Button className="w-full mb-4" onClick={handleAddToCart}>
//                   Add to Cart
//                 </Button>

//                 <p className="font-bold mb-2">Reviews</p>
//                 <div className="h-[130px] overflow-y-auto">
//                   {reviews.length > 0 ? (
//                     reviews.map((review) => (
//                       <div key={review._id} className="flex flex-row items-center mb-3">
//                         <Avatar className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
//                           <AvatarFallback className="bg-gray-200 text-black text-lg">
//                             {review.user?.userName?.[0] || 'U'}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="ml-3">
//                           <h1 className="text-lg font-semibold">{review.user?.userName || 'Anonymous'}</h1>
//                           <div className="flex flex-row items-center">
//                             {[...Array(5)].map((_, index) => (
//                               <svg
//                                 key={index}
//                                 className={`h-5 w-5 ${
//                                   index < review.rating ? 'text-yellow-500' : 'text-gray-300'
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.374 2.448a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.374-2.448a1 1 0 00-1.175 0l-3.374 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.25 8.394c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.966z" />
//                               </svg>
//                             ))}
//                           </div>
//                           <p className="mt-1 text-gray-700">{review.comment}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No reviews yet</p>
//                   )}
//                 </div>

//                 <div className="flex flex-row gap-3 mt-3 justify-between">
//                   <Input
//                     placeholder="Give your review"
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                   />
//                   <Button onClick={handleAddReview}>Submit</Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </DialogPortal>
//     </Dialog>
//     );
// };

// export default ProductDetailDialog;








// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogPortal, DialogOverlay, DialogContent } from '@/components/ui/dialog';
// // import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
// // import { Button } from '@/components/ui/button';
// import { Star, Heart } from 'lucide-react';  // Import Heart icon
// import { useDispatch, useSelector } from 'react-redux';
// import StarRating from './starRating';
// import { addReview, fetchProductDetails, getReviews } from '@/store/shop/products-slice';
// import { addToCart } from '@/store/shop/cart-slice';
// import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '../ui/input';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

// const ProductDetailDialog = ({ isOpen, onClose, productId }) => {
//     const [product, setProduct] = useState(null);
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [reviews, setReviews] = useState([]);
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.auth);
//     const userId = user?.id;

//     const [loading, setLoading] = useState(true);

//     // Fetch product details
//     useEffect(() => {
//         if (productId) {
//             setLoading(true);
//             dispatch(fetchProductDetails(productId))
//                 .unwrap()
//                 .then((response) => {
//                     console.log('Product response:', response);
//                     setProduct(response.data);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching product details:', error);
//                     setLoading(false);
//                 });
//         }
//     }, [dispatch, productId]);

//     // Fetch reviews only when product is loaded
//     useEffect(() => {
//         if (product && product._id) {
//             setLoading(true);
//             dispatch(getReviews(product._id))
//                 .unwrap()
//                 .then((response) => {
//                     console.log('Reviews response:', response);
//                     setReviews(response.reviews || []);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching reviews:', error);
//                     setLoading(false);
//                 });
//         }
//     }, [dispatch, product]);

//     const handleAddToCart = () => {
//         if (product) {
//             dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
//         }
//     };

//     const handleAddReview = async () => {
//         if (rating <= 0 || !comment.trim()) {
//             alert('Both rating and comment are required');
//             return;
//         }

//         const reviewData = {
//             productId: product._id,
//             review: { rating, comment },
//             userId,
//         };

//         try {
//             const response = await dispatch(addReview(reviewData)).unwrap();
//             const newReview = {
//                 ...response.review,
//                 user: {
//                     userName: user?.userName,
//                 },
//             };

//             setReviews((prevReviews) => [newReview, ...prevReviews]);
//             setRating(0);
//             setComment('');
//         } catch (error) {
//             console.error('Error adding review:', error);
//         }
//     };

//     if (loading) {
//         return <p></p>;
//     }

//     return (
//       <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogPortal>
//         <DialogOverlay />
//         <DialogContent className="max-w-screen-md p-6 shadow-xl">
//           <div className="flex gap-6 mt-7 mb-7">
//             {/* Image Column */}
//             <div className="flex-shrink-0 w-2/5">
//               <img
//                 className="w-full max-h-[400px] object-cover shadow-lg rounded-lg"
//                 src={product.image}
//                 alt={product.title}
//               />
//             </div>

//             {/* Details Column */}
//             <div className="flex-grow w-3/5">
//               <div className="mb-4">
//                 <div className="text-3xl font-bold mb-2">{product.title}</div>
//                 <p className="text-xl font-semibold text-muted-foreground">
//                   {product.description}
//                 </p>
//                 <div className="flex flex-row justify-between mb-4">
//                   <p className="text-xl font-semibold line-through">
//                     ${product.price}
//                   </p>
//                   <p className="text-xl font-semibold text-black">
//                     ${product.salePrice}
//                   </p>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <StarRating rating={rating} onRatingChange={setRating} />
//                 </div>
//               </div>
//               <div>
//                 <Button className="w-full mb-4" onClick={handleAddToCart}>
//                   Add to Cart
//                 </Button>

//                 <p className="font-bold mb-2">Reviews</p>
//                 <div className="h-[140px] overflow-y-auto">
//                   {reviews.length > 0 ? (
//                     reviews.map((review) => (
//                       <div key={review._id} className="flex flex-row items-center mb-3">
//                         <Avatar className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
//                           <AvatarFallback className="bg-gray-200 text-black text-lg">
//                             {review.user?.userName?.[0] || 'U'}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="ml-3">
//                           <h1 className="text-lg font-semibold">{review.user?.userName || 'Anonymous'}</h1>
//                           <div className="flex flex-row items-center">
//                             {[...Array(5)].map((_, index) => (
//                               <svg
//                                 key={index}
//                                 className={`h-5 w-5 ${
//                                   index < review.rating ? 'text-yellow-500' : 'text-gray-300'
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.374 2.448a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.374-2.448a1 1 0 00-1.175 0l-3.374 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.25 8.394c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.966z" />
//                               </svg>
//                             ))}
//                           </div>
//                           <p className="mt-1 text-gray-700">{review.comment}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No reviews yet</p>
//                   )}
//                 </div>

//                 <div className="flex flex-row gap-3 mt-8 justify-between items-center">
//                   {/* Heart icon added before the review input */}
//                   <TooltipProvider>
//   <Tooltip>
//     <TooltipTrigger asChild>
//       <button>
//         <Heart className="h-6 w-6 text-gray-500" />
//       </button>
//     </TooltipTrigger>
//     <TooltipContent className="mt-3">
//       <p >Add product to Favorites?</p>
//     </TooltipContent>
//   </Tooltip>
// </TooltipProvider>


//                   <Input
//                     placeholder="Give your review"
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                   />
//                   <Button onClick={handleAddReview}>Submit</Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </DialogPortal>
//     </Dialog>
//     );
// };

// export default ProductDetailDialog;
//current

// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogPortal, DialogOverlay, DialogContent } from '@/components/ui/dialog';
// import { Star, Heart } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import StarRating from './starRating';
// import { addReview, fetchProductDetails, getReviews } from '@/store/shop/products-slice';
// import { addToCart } from '@/store/shop/cart-slice';
// import { addToFavorites, removeFromFavorites, fetchFavorites } from '@/store/auth-slice';  // Import fetchFavorites
// import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '../ui/input';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

// const ProductDetailDialog = ({ isOpen, onClose, productId }) => {
//     const [product, setProduct] = useState(null);
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [reviews, setReviews] = useState([]);
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.auth);
//     const userId = user?.id;
//     console.log("userIddd,",userId)
//     const { favorites } = useSelector((state) => state.auth);  // Get favorites from the state

//     const [loading, setLoading] = useState(true);

//     // Fetch product details
//     useEffect(() => {
//         if (productId) {
//             setLoading(true);
//             dispatch(fetchProductDetails(productId))
//                 .unwrap()
//                 .then((response) => {
//                     console.log('Product response:', response);
//                     setProduct(response.data);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching product details:', error);
//                     setLoading(false);
//                 });
//         }
//     }, [dispatch, productId]);

//     // Fetch reviews only when product is loaded
//     useEffect(() => {
//         if (product && product._id) {
//             setLoading(true);
//             dispatch(getReviews(product._id))
//                 .unwrap()
//                 .then((response) => {
//                     console.log('Reviews response:', response);
//                     setReviews(response.reviews || []);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching reviews:', error);
//                     setLoading(false);
//                 });
//         }
//     }, [dispatch, product]);

//     // Fetch favorites when the dialog is opened
//     // useEffect(() => {
//     //     if (isOpen && userId) {
//     //         dispatch(fetchFavorites(userId));  // Fetch favorites on dialog open
//     //     }
//     // }, [isOpen, userId, dispatch]);

//     const handleAddToCart = () => {
//         if (product) {
//             dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
//         }
//     };

//     const handleAddReview = async () => {
//         if (rating <= 0 || !comment.trim()) {
//             alert('Both rating and comment are required');
//             return;
//         }

//         const reviewData = {
//             productId: product._id,
//             review: { rating, comment },
//             userId,
//         };

//         try {
//             const response = await dispatch(addReview(reviewData)).unwrap();
//             const newReview = {
//                 ...response.review,
//                 user: {
//                     userName: user?.userName,
//                 },
//             };

//             setReviews((prevReviews) => [newReview, ...prevReviews]);
//             setRating(0);
//             setComment('');
//         } catch (error) {
//             console.error('Error adding review:', error);
//         }
//     };

//     // Handle adding/removing product from favorites
//     const handleToggleFavorite = () => {
//         if (favorites.includes(product._id)) {
//             dispatch(removeFromFavorites({ userId, productId: product._id }));
//         } else {
//             dispatch(addToFavorites({ userId, productId: product._id }));  // Add to favorites
//         }
//     };

//     // Check if the product is in the favorites list
//     const isFavorite = favorites.includes(productId);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogPortal>
//                 <DialogOverlay />
//                 <DialogContent className="max-w-screen-md p-6 shadow-xl">
//                     <div className="flex gap-6 mt-7 mb-7">
//                         {/* Image Column */}
//                         <div className="flex-shrink-0 w-2/5">
//                             <img
//                                 className="w-full max-h-[400px] object-cover shadow-lg rounded-lg"
//                                 src={product.image}
//                                 alt={product.title}
//                             />
//                         </div>

//                         {/* Details Column */}
//                         <div className="flex-grow w-3/5">
//                             <div className="mb-4">
//                                 <div className="text-3xl font-bold mb-2">{product.title}</div>
//                                 <p className="text-xl font-semibold text-muted-foreground">
//                                     {product.description}
//                                 </p>
//                                 <div className="flex flex-row justify-between mb-4">
//                                     <p className="text-xl font-semibold line-through">
//                                         ${product.price}
//                                     </p>
//                                     <p className="text-xl font-semibold text-black">
//                                         ${product.salePrice}
//                                     </p>
//                                 </div>
//                                 <div className="flex items-center mb-4">
//                                     <StarRating rating={rating} onRatingChange={setRating} />
//                                 </div>
//                             </div>
//                             <div>
//                                 <Button className="w-full mb-4" onClick={handleAddToCart}>
//                                     Add to Cart
//                                 </Button>

//                                 <p className="font-bold mb-2">Reviews</p>
//                                 <div className="h-[140px] overflow-y-auto">
//                                     {reviews.length > 0 ? (
//                                         reviews.map((review) => (
//                                             <div key={review._id} className="flex flex-row items-center mb-3">
//                                                 <Avatar className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
//                                                     <AvatarFallback className="bg-gray-200 text-black text-lg">
//                                                         {review.user?.userName?.[0] || 'U'}
//                                                     </AvatarFallback>
//                                                 </Avatar>
//                                                 <div className="ml-3">
//                                                     <h1 className="text-lg font-semibold">{review.user?.userName || 'Anonymous'}</h1>
//                                                     <div className="flex flex-row items-center">
//                                                         {[...Array(5)].map((_, index) => (
//                                                             <svg
//                                                                 key={index}
//                                                                 className={`h-5 w-5 ${
//                                                                     index < review.rating ? 'text-yellow-500' : 'text-gray-300'
//                                                                 }`}
//                                                                 fill="currentColor"
//                                                                 viewBox="0 0 20 20"
//                                                                 xmlns="http://www.w3.org/2000/svg"
//                                                             >
//                                                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.374 2.448a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.374-2.448a1 1 0 00-1.175 0l-3.374 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.25 8.394c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.966z" />
//                                                             </svg>
//                                                         ))}
//                                                     </div>
//                                                     <p className="mt-1 text-gray-700">{review.comment}</p>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <p>No reviews yet</p>
//                                     )}
//                                 </div>

//                                 <div className="flex flex-row gap-3 mt-8 justify-between items-center">
//                                     <TooltipProvider>
//                                         <Tooltip>
//                                             <TooltipTrigger asChild>
//                                                 <button onClick={handleToggleFavorite}>
//                                                     <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`} />
//                                                 </button>
//                                             </TooltipTrigger>
//                                             <TooltipContent className="mt-3">
//                                                 <p>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</p>
//                                             </TooltipContent>
//                                         </Tooltip>
//                                     </TooltipProvider>

//                                     <Input
//                                         placeholder="Give your review"
//                                         value={comment}
//                                         onChange={(e) => setComment(e.target.value)}
//                                     />
//                                     <Button onClick={handleAddReview}>Submit</Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </DialogContent>
//             </DialogPortal>
//         </Dialog>
//     );
// };

// export default ProductDetailDialog;


import React, { useEffect, useState } from 'react';
import { Dialog, DialogPortal, DialogOverlay, DialogContent } from '@/components/ui/dialog';
import { MessageCircle, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from './starRating';
import { addReview, fetchProductDetails, getReviews } from '@/store/shop/products-slice';
import { addToCart } from '@/store/shop/cart-slice';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
// import { ChatIcon } from 'lucide-react'; // Add this import for the chat icon
import ChatBox from './chatBox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useNavigate } from 'react-router-dom';
const ProductDetailDialog = ({ isOpen, onClose, productId }) => {
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const userId = user?.id;
    const navigate = useNavigate();

    const handleChatNavigation = () => {
      navigate('/shop/chat');
    };
    // Fetch product details
    useEffect(() => {
        if (productId) {
            setLoading(true);
            dispatch(fetchProductDetails(productId))
                .unwrap()
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching product details:', error);
                    setLoading(false);
                });
        }
    }, [dispatch, productId]);

    // Fetch reviews only when product is loaded
    useEffect(() => {
        if (product && product._id) {
            setLoading(true);
            dispatch(getReviews(product._id))
                .unwrap()
                .then((response) => {
                    setReviews(response.reviews || []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching reviews:', error);
                    setLoading(false);
                });
        }
    }, [dispatch, product]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
        }
    };

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
            const newReview = {
                ...response.review,
                user: {
                    userName: user?.userName,
                },
            };

            setReviews((prevReviews) => [newReview, ...prevReviews]);
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const toggleChat = () => {
        setIsChatOpen((prevState) => !prevState); // Toggle chatbox visibility
    };

    if (loading) {
        return <p> </p>;
    }

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
                                    <p className="text-xl font-semibold line-through">${product.price}</p>
                                    <p className="text-xl font-semibold text-black">${product.salePrice}</p>
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
                                                    <h1 className="text-lg font-semibold">
                                                        {review.user?.userName || 'Anonymous'}
                                                    </h1>
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
                    {/* Chat Icon */}
                    <div className='ml-2'>
                    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <button
onClick={handleChatNavigation}
  className="bg-white text-black p-3 rounded-full shadow-lg flex items-center justify-center ml-2"
>
  <MessageCircle className="h-8 w-8" /> {/* Adjust size here */}
</button>

    </TooltipTrigger>
    <TooltipContent
    //   className="bg-black text-white text-sm rounded py-1 px-2 shadow-lg mr-60 "
    //   side="top"    // Position the tooltip above
    //  // Center the tooltip horizontally relative to the icon
    //   sideOffset={0} // Add some space between the tooltip and the icon
    >
      Chat with Seller
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
</div>

                    {/* Chat Box (Example) */}
                    {/* {isChatOpen && (
                        <div  className="fixed bottom-16 right-5 bg-white p-4 shadow-lg w-80 h-64 border rounded-lg">
                        <ChatBox/>
                        </div>
                    )} */}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default ProductDetailDialog;
