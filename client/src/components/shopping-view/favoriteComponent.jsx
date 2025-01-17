// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductDetails } from '@/store/shop/products-slice'; // Correct import for fetchProductDetails
// import { Button } from '../ui/button';
// import { addToCart } from '@/store/shop/cart-slice';
// addToCart
// export default function FavoriteComponent({ favoriteItems }) {
//   const dispatch = useDispatch();
//   const [fetchedProducts, setFetchedProducts] = useState([]);
//     const handleAddToCart = () => {
//         if (product) {
//             dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
//         }
//     };
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const uniqueIds = [...new Set(favoriteItems)]; // Remove duplicate IDs
//       const productPromises = uniqueIds.map((id) =>
//         dispatch(fetchProductDetails(id))
//       );

//       // Wait for all products to be fetched
//       const fetchedData = await Promise.all(productPromises);
//       console.log("fetchedProductData", fetchedData)
//       setFetchedProducts(fetchedData.map((result) => result.payload.data)); // Assuming fetchProductDetails returns payload
//     };

//     fetchFavorites();
//   }, [favoriteItems, dispatch]);

//   return (
//     <div>
//         <div className='flex justify-center items-center text-2xl'>
//         <h2 >Your Favorites</h2>
//         </div>
  
//       {fetchedProducts.length > 0 ? (
//    <ul className="space-y-4">
//    {fetchedProducts.map((product) => (
//      <li key={product._id} className="flex items-center space-x-6 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
//        <div className="flex flex-col items-center space-y-2">
//          <img
//            src={product.image}
//            alt={product.title}
//            className="w-24 h-24 object-cover rounded-lg shadow-sm"
//          />
//          <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
//          <p className="text-lg font-medium text-gray-600">{product.price} USD</p>
//        </div>
//        <div className="flex items-center justify-center h-full px-4">
//          <p className="text-sm text-gray-500">{product.description}</p>
//        </div>
//        <div className="w-full mt-4">
//          {product?.totalStock > 0 ? (
//            <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200" onClick={handleAddToCart}>
//              Add to cart
//            </Button>
//          ) : (
//            <Button className="w-full bg-gray-500 text-black disabled" disabled>
//              Out of stock
//            </Button>
//          )}
//        </div>
//      </li>
//    ))}
//  </ul>
 
  

//       ) : (
//         <p>No favorite products found.</p>
//       )}
//     </div>
//   )
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '@/store/shop/products-slice'; // Correct import for fetchProductDetails
import { Button } from '../ui/button';
import { addToCart } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';

export default function FavoriteComponent({ favoriteItems }) {
  const dispatch = useDispatch();
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const { toast } = useToast();  // Initialize toast
  
  // Extract user data from state.auth
  const userId = useSelector((state) => state.auth.user?.id);  // Access user.id

  const handleAddToCart = (product) => {
    if (product && userId) {
      dispatch(addToCart({
        userId,
        productId: product._id,
        quantity: 1,
        weight: product.weight,
        totalStock: product.totalStock
      }));

      // Show success toast
      toast({
        title: 'Added to Cart',
        description: `${product.title} has been added to your cart.`,
        status: 'success',
        duration: 3000, // Duration of the toast (in milliseconds)
        isClosable: true, // Option to close the toast manually
      });
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const uniqueIds = [...new Set(favoriteItems)]; // Remove duplicate IDs
      const productPromises = uniqueIds.map((id) =>
        dispatch(fetchProductDetails(id))
      );

      // Wait for all products to be fetched
      const fetchedData = await Promise.all(productPromises);
      console.log("fetchedProductData", fetchedData);
      setFetchedProducts(fetchedData.map((result) => result.payload.data)); // Assuming fetchProductDetails returns payload
    };

    fetchFavorites();
  }, [favoriteItems, dispatch]);

  return (
    <div>
      <div className='flex justify-center items-center text-2xl'>
        <h2>Your Favorites</h2>
      </div>
  
      {fetchedProducts.length > 0 ? (
        <div className="overflow-y-auto max-h-[calc(100vh-100px)]">  {/* Wrapper with scrollable content */}
          <ul className="space-y-4">
            {fetchedProducts.map((product) => (
              <li key={product._id} className="flex items-center space-x-6 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 text-center">{product.title}</h3>
                  <p className="text-lg font-medium text-gray-600 text-center">{product.price} USD</p>
                </div>
                <div className="flex flex-col justify-between px-4 space-y-4 h-full flex-grow">
                  <p className="text-sm text-gray-500 flex-grow">{product.description}</p>
                  <div className="w-full mt-4">
                    {product?.totalStock > 0 ? (
                      <Button 
                        className="w-full bg-blue-300 text-black
                         hover:bg-blue-200 transition-colors duration-200" 
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </Button>
                    ) : (
                      <Button className="w-full bg-gray-500 text-black disabled" disabled>
                        Out of stock
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No favorite products found.</p>
      )}
    </div>
  );
}
