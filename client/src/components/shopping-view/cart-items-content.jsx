// // // import { Trash } from 'lucide-react';
// // // import React from 'react';

// // // const CartItemsContent = ({ items }) => {
// // //     console.log("itemssss",items);
// // //     const calculateTotalPrice = () => {
// // //         return items.reduce((total, item) => {
// // //           // Determine the price to use based on availability of salePrice
// // //           const priceToUse = item.product.salePrice > 0 ? item.product.salePrice : item.product.price;
// // //           return total + (priceToUse * item.quantity); // Multiply by quantity and accumulate total
// // //         }, 0).toFixed(2); // Ensure the total is rounded to 2 decimal places
// // //       };
 
// // //   return (
// // //     <div className=' px-0 space-y-7'>
// // //     <div className="overflow-y-auto max-h-[500px] p-4 space-y-4 border border-gray-200 rounded-lg bg-white">
// // //       {items.length === 0 ? (
// // //         <p className="text-center text-gray-500">Your cart is empty.</p>
// // //       ) : (

// // //         items.map((item) => (
// // //           <div
// // //             key={item.product._id}
// // //           className='flex flex-row gap-4 '
// // //           >
// // //             <div className='flex-shrink-0'>
// // //             <img
// // //               src={item.product.image}
// // //               alt={item.product.title}
// // //            className="w-24 h-24 object-cover rounded-lg"
// // //             />
// // //             </div>
// // //             <div className="flex flex-col flex-1 ">
// // //                 <div className='flex flex-row justify-between items-center'>
// // //                 <p className="text-lg font-semibold max-w-[120px] overflow-hidden whitespace-normal break-words">
// // //                                         {item.product.title}
// // //                                     </p>    <p className="text-sm text-gray-700">
// // //                     {item.product.salePrice > 0 ? (
// // //                       <>
// // //                         {/* <span className="line-through text-gray-500">${item.product.price}</span> */}
// // //                         <span className="ml-2 text-black-600">${item.product.salePrice}</span>
// // //                       </>
// // //                     ) : (
// // //                       `$${item.product.price}`
// // //                     )}
// // //                   </p>
            
// // //                 </div>
// // //                 <div className='flex flex-row justify-between items-center'>
// // //                 <div className='flex flex-row gap-3  items-center'>
// // //                     <p>-</p>
// // //                 <p className="text-gray-600"> {item.quantity}</p>
// // //                 <p>+</p>
// // //                     </div>
// // //                     <div>
// // //                     <Trash className='w-4 h-4'/>
// // //                     </div>
// // //             </div>
             
// // //             </div>
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //     <div className='flex flex-row justify-between items-center'>
// // // <p>Total</p>
// // // <p className="text-lg font-semibold">${calculateTotalPrice()}</p>
// // //     </div>
// // //     </div>
// // //   );
// // // };

// // // export default CartItemsContent;
// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Trash } from 'lucide-react';
// // import { removeFromCart, updateCartItemQty } from '@/store/shop/cart-slice';

// // const CartItemsContent = ({ items }) => {
// //   const dispatch = useDispatch();
// // const {user}=useSelector((state)=>state.auth)
// // const userId=user.id;
// //   const calculateTotalPrice = () => {
// //     return items.reduce((total, item) => {
// //       const priceToUse = item.product.salePrice > 0 ? item.product.salePrice : item.product.price;
// //       return total + (priceToUse * item.quantity);
// //     }, 0).toFixed(2);
// //   };

// //   const handleQuantityChange = (productId, quantity) => {
// //     // Only dispatch if quantity is greater than 0
// //     if (quantity > 0) {
// //       dispatch(updateCartItemQty({ userId, productId, quantity }));
// //     }
// //   };

// //   const handleRemoveItem = (productId) => {
// //     dispatch(removeFromCart({ userId, productId }));
// //   };

// //   return (
// //     <div className='px-0 space-y-7'>
// //       <div className="overflow-y-auto max-h-[500px] p-4 space-y-4 border border-gray-200 rounded-lg bg-white">
// //         {items.length === 0 ? (
// //           <p className="text-center text-gray-500">Your cart is empty.</p>
// //         ) : (
// //           items.map((item) => (
// //             <div key={item.product._id} className='flex flex-row gap-4'>
// //               <div className='flex-shrink-0'>
// //                 <img
// //                   src={item.product.image}
// //                   alt={item.product.title}
// //                   className="w-24 h-24 object-cover rounded-lg"
// //                 />
// //               </div>
// //               <div className="flex flex-col flex-1">
// //                 <div className='flex flex-row justify-between items-center'>
// //                   <p className="text-lg font-semibold max-w-[120px] overflow-hidden whitespace-normal break-words">
// //                     {item.product.title}
// //                   </p>
// //                   <p className="text-sm text-gray-700">
// //                     {item.product.salePrice > 0 ? (
// //                       <>
// //                         <span className="ml-2 text-black-600">${item.product.salePrice}</span>
// //                       </>
// //                     ) : (
// //                       `$${item.product.price}`
// //                     )}
// //                   </p>
// //                 </div>
// //                 <div className='flex flex-row justify-between items-center'>
// //                   <div className='flex flex-row gap-3 items-center'>
// //                     <button 
// //                       onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)} 
// //                       disabled={item.quantity <= 1}
// //                       className='p-1 bg-gray-200 rounded'
// //                     >
// //                       -
// //                     </button>
// //                     <p className="text-gray-600">{item.quantity}</p>
// //                     <button 
// //                       onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
// //                       className='p-1 bg-gray-200 rounded'
// //                     >
// //                       +
// //                     </button>
// //                   </div>
// //                   <div>
// //                     <button onClick={() => handleRemoveItem(item.product._id)}>
// //                       <Trash className='w-4 h-4 text-red-500' />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //       <div className='flex flex-row justify-between items-center'>
// //         <p>Total</p>
// //         <p className="text-lg font-semibold">${calculateTotalPrice()}</p>
// //       </div>
// //     </div>
// //   );
// // };


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Trash } from 'lucide-react';

// import { fetchCartItems, removeFromCart, updateCartItemQty } from '@/store/shop/cart-slice';
// import { Button } from '../ui/button';
// import { useNavigate } from 'react-router-dom';

// const Content = ({ items,
//     showCheckOutButton }) => {
//     console.log("cartitemscontent,,", items);
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.auth);
//     const userId = user.id;
//   const navigate=useNavigate();
//     useEffect(() => {
//       console.log('Cart items updated:', items);
//     }, [items]);
  
//     const calculateTotalPrice = () => {
//       return items.reduce((total, item) => {
//         const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
//         return total + (priceToUse * item.quantity);
//       }, 0).toFixed(2);
//     };
  
//     const handleQuantityChange = async (productId, quantity) => {
//       if (quantity > 0) {
//         try {
//           await dispatch(updateCartItemQty({ userId, productId, quantity })).unwrap();
//           await dispatch(fetchCartItems(userId)).unwrap();
//         } catch (error) {
//           console.error('Error updating cart item quantity:', error);
//         }
//       }
//     };
  
//     const handleRemoveItem = async (productId) => {
//       try {
//         await dispatch(removeFromCart({ userId, productId })).unwrap();
//         await dispatch(fetchCartItems(userId)).unwrap();
//       } catch (error) {
//         console.error('Error removing cart item:', error);
//       }
//     };
  
//     return (
//       <div className='px-0 space-y-7'>
//         <div className="overflow-y-auto max-h-[500px] p-4 space-y-4 border border-gray-200 rounded-lg bg-white">
//           {items.length === 0 ? (
//             <p className="text-center text-gray-500">Your cart is empty.</p>
//           ) : (
//             items.map((item, index) => (
//               <div key={`${item.productId}-${index}`} className='flex flex-row gap-4'>
//                 <div className='flex-shrink-0'>
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />
//                 </div>
//                 <div className="flex flex-col flex-1">
//                   <div className='flex flex-row justify-between items-center'>
//                     <p className="text-lg font-semibold max-w-[120px] overflow-hidden whitespace-normal break-words">
//                       {item.title}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       {item.salePrice > 0 ? (
//                         <>
//                           <span className="ml-2 text-black-600">${item.salePrice}</span>
//                         </>
//                       ) : (
//                         `$${item.price}`
//                       )}
//                     </p>
//                   </div>
//                   <div className='flex flex-row justify-between items-center'>
//                     <div className='flex flex-row gap-3 items-center'>
//                       <button
//                         onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
//                         disabled={item.quantity <= 1}
//                         className='p-1 rounded'
//                       >
//                         -
//                       </button>
//                       <p className="text-gray-600">{item.quantity}</p>
//                       <button
//                         onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
//                         className='p-1 rounded'
//                       >
//                         +
//                       </button>
//                     </div>
//                     <div>
//                       <button onClick={() => handleRemoveItem(item.productId)}>
//                         <Trash className='w-4 h-4 text-red-500' />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         <div className='flex flex-row justify-between items-center'>
//           <p>Total</p>
//           {showCheckOutButton && (
//             <Button onClick={() => navigate('/shop/checkout')}>
//               CheckOut
//             </Button>
//           )}
//           <p className="text-lg font-semibold">${calculateTotalPrice()}</p>
//         </div>
//       </div>
//     );
//   };
  

//   export default CartItemsContent;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Trash } from 'lucide-react';

// import { fetchCartItems, removeFromCart, updateCartItemQty } from '@/store/shop/cart-slice';
// import { Button } from '../ui/button';
// import { useNavigate } from 'react-router-dom';

// const CartItemsContent = ({ items, showCheckOutButton }) => {
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.auth);
//     const { isLoading} = useSelector((state) => state.products);
//    const userId = user.id;
//     const navigate = useNavigate();
// console.log("showCheckOutButton,", showCheckOutButton)
//     useEffect(() => {
//         console.log('Cart items updated:', items);
//     }, [items]);

//     const calculateTotalPrice = () => {
//         return items.reduce((total, item) => {
//             const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
//             return total + (priceToUse * item.quantity);
//         }, 0).toFixed(2);
//     };

//     const handleQuantityChange = async (productId, quantity) => {
//         if (quantity > 0) {
//             try {
//                 await dispatch(updateCartItemQty({ userId, productId, quantity })).unwrap();
//                 await dispatch(fetchCartItems(userId)).unwrap();
//             } catch (error) {
//                 console.error('Error updating cart item quantity:', error);
//             }
//         }
//     };

//     const handleRemoveItem = async (productId) => {
//         try {
//             await dispatch(removeFromCart({ userId, productId })).unwrap();
//             await dispatch(fetchCartItems(userId)).unwrap();
//         } catch (error) {
//             console.error('Error removing cart item:', error);
//         }
//     };

//     return (
//         <div className='px-0 space-y-7'>
//             <div className="overflow-y-auto max-h-[500px] p-4 space-y-4 border border-gray-200 rounded-lg bg-white">
//                 {isLoading ? (
//                     <p className="text-center text-gray-500">Loading your cart...</p>
//                 )
//                  : 
//                 //  items.length === 0 ? (
//                 //     <p className="text-center text-gray-500">Your cart is empty.</p>
//                 // ) 
//                 // :
//                  (
//                     items.map((item, index) => (
//                         <div key={`${item.productId}-${index}`} className='flex flex-row gap-4'>
//                             <div className='flex-shrink-0'>
//                                 <img
//                                     src={item.image}
//                                     alt={item.title}
//                                     className="w-24 h-24 object-cover rounded-lg"
//                                 />
//                             </div>
//                             <div className="flex flex-col flex-1">
//                                 <div className='flex flex-row justify-between items-center'>
//                                     <p className="text-lg font-semibold max-w-[120px] overflow-hidden whitespace-normal break-words">
//                                         {item.title}
//                                     </p>
//                                     <p className="text-sm text-gray-700">
//                                         {item.salePrice > 0 ? (
//                                             <span className="ml-2 text-black-600">${item.salePrice}</span>
//                                         ) : (
//                                             `$${item.price}`
//                                         )}
//                                     </p>
//                                 </div>
//                                 <div className='flex flex-row justify-between items-center'>
//                                     <div className='flex flex-row gap-3 items-center'>
//                                         <button
//                                             onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
//                                             disabled={item.quantity <= 1}
//                                             className='p-1 rounded'
//                                         >
//                                             -
//                                         </button>
//                                         <p className="text-gray-600">{item.quantity}</p>
//                                         <button
//                                             onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
//                                             className='p-1 rounded'
//                                         >
//                                             +
//                                         </button>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => handleRemoveItem(item.productId)}>
//                                             <Trash className='w-4 h-4 text-red-500' />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//             <div className='flex flex-row justify-between items-center'>
//                 <p>Total</p>
//                 {showCheckOutButton ? (
//                     <Button onClick={() => navigate('/shop/checkout')}>
//                         CheckOut
//                     </Button>
//                 ) : null}
//                 <p className="text-lg font-semibold">${calculateTotalPrice()}</p>
//             </div>
//         </div>
//     );
// };

// export default CartItemsContent;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { updateCartItemQty, removeFromCart, fetchCartItems } from '../redux/cartSlice'; // Assuming these actions are defined in cartSlice
import { Button } from '../ui/button';
import { Trash } from 'lucide-react'
import { fetchCartItems, removeFromCart, updateCartItemQty } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';

const CartItemsContent = ({ items, showCheckOutButton }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isLoading } = useSelector((state) => state.products);
    const { toast } = useToast(); // Get the toast function

    const userId = user.id;
    const navigate = useNavigate();

    console.log("showCheckOutButton,", showCheckOutButton);

    useEffect(() => {
        console.log('Cart items updated:', items);
    }, [items]);

    const validItems = Array.isArray(items) ? items : [];

    const calculateTotalPrice = () => {
        return validItems.reduce((total, item) => {
            const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
            return total + (priceToUse * item.quantity);
        }, 0).toFixed(2);
    };
    const handleQuantityChange = async (productId, quantity) => {
        if (quantity > 0) {
            try {
                await dispatch(updateCartItemQty({ userId, productId, quantity })).unwrap();
                await dispatch(fetchCartItems(userId)).unwrap();
                toast({ title: 'Quantity updated successfully!' }); // Show toast on success
              }  catch (error) {
                    console.error('Error updating cart item quantity:', error);
        
                    // Extract the error message, if available
                    const errorMessage = error.message || 'Something went wrong!';
        
                    toast({ title: errorMessage, variant: 'destructive' }); // Show toast on error
                }
        }
    };



    const handleRemoveItem = async (productId) => {
        try {
            await dispatch(removeFromCart({ userId, productId })).unwrap();
            await dispatch(fetchCartItems(userId)).unwrap();
            toast({ title: 'Item removed from cart!' }); // Show toast on success
        } catch (error) {
            console.error('Error removing cart item:', error);
            toast({ title: 'Failed to remove item.', variant: 'destructive' }); // Show toast on error
        }
    };


    return (
        <div className='px-0 space-y-7'>
            <div className="overflow-y-auto max-h-[500px] p-4 space-y-4 border border-gray-200 rounded-lg bg-white">
                {validItems.length > 0 ? (
                    validItems.map((item, index) => (
                        <div key={`${item.productId}-${index}`} className='flex flex-row gap-4'>
                            <div className='flex-shrink-0'>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className='flex flex-row justify-between items-center'>
                                    <p className="text-lg font-semibold max-w-[120px] overflow-hidden whitespace-normal break-words">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {item.salePrice > 0 ? (
                                            <span className="ml-2 text-black-600">${item.salePrice}</span>
                                        ) : (
                                            `$${item.price}`
                                        )}
                                    </p>
                                </div>
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-row gap-3 items-center'>
                                        <button
                                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className='p-1 rounded'
                                        >
                                            -
                                        </button>
                                        <p className="text-gray-600">{item.quantity}</p>
                                        <button
                                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                            className='p-1 rounded'
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => handleRemoveItem(item.productId)}>
                                            <Trash className='w-4 h-4 text-red-500' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            <div className='flex flex-row justify-between items-center'>
                <p>Total</p>
                <p className="text-lg font-semibold">${calculateTotalPrice()}</p>
                {showCheckOutButton && (
                    <Button onClick={() => navigate('/shop/checkout')}>
                        CheckOut
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CartItemsContent;
