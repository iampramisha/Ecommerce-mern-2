// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import Address from '@/components/shopping-view/address';
// import AddressTile from '@/components/shopping-view/address-tile';
// import { Button } from '@/components/ui/button';
// import CartWrapper from '@/components/shopping-view/cart-wrapper';

// export default function ShoppingCheckout() {
//   // State to show/hide AddressTile
//   const [showAddressTile, setShowAddressTile] = useState(false);

//   // Function to toggle the AddressTile visibility
//   const handleAddAddress = () => {
//     setShowAddressTile(!showAddressTile); // Toggle the state
//   };

//   const handleCloseAddress = () => {
//     setShowAddressTile(false); // Hide the address form when close icon is clicked
//   };

//   const { items } = useSelector((state) => state.cart); // Access cart items
// console.log("itemss,",items);
//   return (
//     <div className='w-full min-h-screen'>
//       <div className='h-[360px] w-full'>
//         <img
//           className='w-full h-full object-cover'
//           src='https://americantwoshot.com/wp-content/uploads/2021/12/starting-a-clothing-line.jpg'
//           alt='wardrobe'
//         />
//       </div>
//       <div className='flex p-20'>
//         {/* Left div for AddressTile and Address, taking 50% width */}
//         <div className='w-1/2 pr-4'>
//           {/* Add Address button */}
//           <div className='flex justify-center'>
//             {!showAddressTile && (
//               <Button className="mt-3 mb-3" onClick={handleAddAddress}>
//                 Add Address
//               </Button>
//             )}
//           </div>

//           {/* Render AddressTile only when showAddressTile is true */}
//           {showAddressTile && (
//             <div className="relative border border-gray rounded-lg p-8">
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                 onClick={handleCloseAddress}
//               >
//                 &times; {/* This represents the close (X) icon */}
//               </button>
//               <AddressTile col={true} />
//             </div>
//           )}

//           {/* Address component */}
//           <div className='w-full border border-gray rounded-lg p-8 mt-4'>
//             <Address col={true} />
//           </div>
//         </div>

//         {/* Right div for CartWrapper */}
//         <div className='w-1/2'>
//           <CartWrapper cartItems={items}  showCheckOutButton={false} />
//           <Button className="mt-3 w-full">CheckOut with Paypal</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Address from '@/components/shopping-view/address';
// import AddressTile from '@/components/shopping-view/address-tile';
// import { Button } from '@/components/ui/button';
// import CartWrapper from '@/components/shopping-view/cart-wrapper';
// import { createOrder } from '@/store/shop/order-slice'; // Import the createOrder thunk
// import { useNavigate } from 'react-router-dom';

// export default function ShoppingCheckout() {
//   const [showAddressTile, setShowAddressTile] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { items } = useSelector((state) => state.cart);
//   const userId = useSelector((state) => state.auth.user.id); // Get user ID from the auth slice

//   const handleAddAddress = () => {
//     setShowAddressTile(!showAddressTile);
//   };

//   const handleCloseAddress = () => {
//     setShowAddressTile(false);
//   };

//   const handleSelectAddress = (address) => {
//     setSelectedAddress(address);
//     setShowAddressTile(false);
//   };

//   const handleCheckout = async () => {
//     if (items.length === 0) {
//       alert('Your cart is empty! Please add items to your cart before checking out.');
//       return;
//     }
    
//     if (!selectedAddress) {
//       alert('Please select an address for the checkout.');
//       return;
//     }

//     // Create order details
//     const total = calculateTotalPrice(items); // Function to calculate total price
//     const orderDetails = {
//       items: items.map(item => ({
//         ProductId: item.productId, // Assuming the product ID is stored in item.productId
//         title: item.title,
//         image: item.image,
//         price: item.price,
//         salePrice: item.salePrice,
//         quantity: item.quantity,
//       })),
//       userId,
//       addressInfo: {
//         addressid: selectedAddress._id, // Use the selected address ID
//         address: selectedAddress.address,
//         city: selectedAddress.city,
//         pinCode: selectedAddress.pinCode,
//         notes: selectedAddress.notes,
//       },
//       total,
//     };

//     // Dispatch the createOrder thunk
//     const resultAction = await dispatch(createOrder(orderDetails));

//     if (createOrder.fulfilled.match(resultAction)) {
//       // If the order was created successfully, you can redirect the user or show success message
//       console.log("Order created successfully:", resultAction.payload);
//       navigate('/confirmation', { state: { orderId: resultAction.payload._id } }); // Example to navigate to a confirmation page
//     } else {
//       // Handle the error scenario
//       console.error('Failed to create order:', resultAction.error.message);
//     }
//   };

//   const calculateTotalPrice = (items) => {
//     return items.reduce((total, item) => {
//       const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
//       return total + (priceToUse * item.quantity);
//     }, 0).toFixed(2);
//   };

//   return (
//     <div className='w-full min-h-screen'>
//       <div className='h-[360px] w-full'>
//         <img
//           className='w-full h-full object-cover'
//           src='https://americantwoshot.com/wp-content/uploads/2021/12/starting-a-clothing-line.jpg'
//           alt='wardrobe'
//         />
//       </div>
//       <div className='flex p-20'>
//         <div className='w-1/2 pr-4'>
//           <div className='flex justify-center'>
//             {!showAddressTile && (
//               <Button className="mt-3 mb-3" onClick={handleAddAddress}>
//                 Add Address
//               </Button>
//             )}
//           </div>

//           {showAddressTile && (
//             <div className="relative border border-gray rounded-lg p-8">
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                 onClick={handleCloseAddress}
//               >
//                 &times;
//               </button>
//               <AddressTile col={true} />
//             </div>
//           )}

//           <div className='w-full border border-gray rounded-lg p-8 mt-4'>
//             <Address col={true} onSelect={handleSelectAddress} />
//           </div>
//         </div>

//         <div className='w-1/2'>
//           <CartWrapper cartItems={items} showCheckOutButton={false} />
//           <Button className="mt-3 w-full" onClick={handleCheckout}>
//             CheckOut with Paypal
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import Address from '@/components/shopping-view/address';
// import AddressTile from '@/components/shopping-view/address-tile';
// import { Button } from '@/components/ui/button';
// import CartWrapper from '@/components/shopping-view/cart-wrapper';

// export default function ShoppingCheckout() {
//   // State to show/hide AddressTile and store selected address
//   const [showAddressTile, setShowAddressTile] = useState(false);
//   const [selectedAddressId, setSelectedAddressId] = useState(null); // Store selected address ID

//   // Function to toggle the AddressTile visibility
//   const handleAddAddress = () => {
//     setShowAddressTile(!showAddressTile);
//   };

//   const handleCloseAddress = () => {
//     setShowAddressTile(false); // Hide the address form when close icon is clicked
//   };
//   const calculateTotalPrice = () => {
//     return items.reduce((total, item) => {
//       const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
//       return total + (priceToUse * item.quantity);
//     }, 0).toFixed(2);
//   };
//   const handleSelectAddress = (addressId) => {
//     setSelectedAddressId(addressId); // Update selected address ID
//     console.log('Selected Address ID:', addressId); // For debugging or further actions
//   };

//   const { items } = useSelector((state) => state.cart); // Access cart items
//   console.log("itemss,", items);

//   return (
//     <div className='w-full min-h-screen'>
//       <div className='h-[360px] w-full'>
//         <img
//           className='w-full h-full object-cover'
//           src='https://americantwoshot.com/wp-content/uploads/2021/12/starting-a-clothing-line.jpg'
//           alt='wardrobe'
//         />
//       </div>
//       <div className='flex p-20'>
//         {/* Left div for AddressTile and Address, taking 50% width */}
//         <div className='w-1/2 pr-4'>
//           {/* Add Address button */}
//           <div className='flex justify-center'>
//             {!showAddressTile && (
//               <Button className="mt-3 mb-3" onClick={handleAddAddress}>
//                 Add Address
//               </Button>
//             )}
//           </div>

//           {/* Render AddressTile only when showAddressTile is true */}
//           {showAddressTile && (
//             <div className="relative border border-gray rounded-lg p-8">
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                 onClick={handleCloseAddress}
//               >
//                 &times; {/* This represents the close (X) icon */}
//               </button>
//               <AddressTile col={true} />
//             </div>
//           )}

//           {/* Address component with onSelect prop */}
//           <div className='w-full border border-gray rounded-lg p-8 mt-4'>
//             <Address col={true} onSelect={handleSelectAddress} />
//           </div>
//         </div>

//         {/* Right div for CartWrapper */}
//         <div className='w-1/2'>
//           <CartWrapper cartItems={items} showCheckOutButton={false} />
//           <Button className="mt-3 w-full">CheckOut with Paypal</Button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Button } from '@/components/ui/button';
// import Address from '@/components/shopping-view/address';
// import CartWrapper from '@/components/shopping-view/cart-wrapper';
// import { createOrder } from '@/store/shop/order-slice'; // Import the createOrder action
// import AddressTile from '@/components/shopping-view/address-tile';
// import { fetchNearestBranch } from '@/store/shop/distance-slice';
// export default function ShoppingCheckout() {

// const dispatch = useDispatch();

// const [showAddressTile, setShowAddressTile] = useState(false);
// const [selectedAddressId, setSelectedAddressId] = useState(null); 
// const [selectedAddress, setSelectedAddress] = useState(null); 
// const [shippingCost, setShippingCost] = useState(0); // Add state for shipping cost

// const { items } = useSelector((state) => state.cart);
// const { user } = useSelector((state) => state.auth);
// const userId = user?.id;
// console.log("itemsszzwwww", items)

//   const handleAddAddress = () => {
//     setShowAddressTile(!showAddressTile);
//   };


//   // Function to close the AddressTile form
//   const handleCloseAddress = () => {
//     setShowAddressTile(false);
//   };
// // Fetch nearest branch and calculate shipping cost when address is selected
// const handleSelectAddress = async (addressId, addressObject) => {
//   setSelectedAddressId(addressId);
//   setSelectedAddress(addressObject);

//   try {
//     const response = await dispatch(
//       fetchNearestBranch({
//         address: addressObject.address,
//         city: addressObject.city
//       })
//     ).unwrap();

//     console.log('Nearest branch response:', response);
//     setShippingCost(response.shippingCost); // Set the shipping cost from the response
//   } catch (error) {
//     console.error('Error fetching nearest branch and shipping cost:', error);
//   }
// };

// const calculateTotalPrice = () => {
//   const cartTotal = items.reduce((total, item) => {
//       const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
//       return total + priceToUse * item.quantity;
//   }, 0);

//   const finalTotal = cartTotal + shippingCost;

//   // Ensure that the total is valid and formatted correctly
//   return finalTotal ? finalTotal.toFixed(2).toString() : "0.00";
// };


// const handleCheckout = async () => {
//   if (!selectedAddressId || !items.length) {
//     console.log("No address or items selected for checkout.");
//     return;
//   }

//   const total = calculateTotalPrice(); // Calculate total including shipping

//   const addressInfo = {
//     addressId: selectedAddressId,
//     address: selectedAddress.address,
//     city: selectedAddress.city,
//     pinCode: selectedAddress.pinCode,
//     notes: selectedAddress.notes,
//   };

//   try {
//     const response = await dispatch(
//       createOrder({
//         items: items.map(item => ({
//           productId: item.productId,
//           title: item.title,
//           image: item.image,
//           price: item.price,
//           salePrice: item.salePrice,
//           quantity: item.quantity,
//         })),
//         userId,
//         addressInfo,
//         total,
//         shippingCost, // Pass the shipping cost to the order
//       })
//     ).unwrap();

//     console.log('Order created successfully:', response);
//   } catch (error) {
//     console.error('Failed to create order:', error);
//   }
// };
//   return (
//     <div className='w-full min-h-screen'>
//       <div className='h-[360px] w-full'>
//         <img
//           className='w-full h-full object-cover'
//           src='https://americantwoshot.com/wp-content/uploads/2021/12/starting-a-clothing-line.jpg'
//           alt='wardrobe'
//         />
//       </div>
//       <div className='flex p-1 md:p-20 flex-col md:flex-row '>
//         {/* Left div for AddressTile and Address, taking 50% width */}
//         <div className=' w-full md:w-1/2 pr-4'>
//           {/* Add Address button */}
//           <div className='flex justify-center'>
//             {!showAddressTile && (
//               <Button className="mt-3 mb-3" onClick={handleAddAddress}>
//                 Add Address
//               </Button>
//             )}
//           </div>

//           {/* Render AddressTile only when showAddressTile is true */}
//           {showAddressTile && (
//             <div className="relative border border-gray rounded-lg p-8">
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                 onClick={handleCloseAddress}
//               >
//                 &times; {/* This represents the close (X) icon */}
//               </button>
//               <AddressTile col={true} />
//             </div>
//           )}

//           {/* Address component with onSelect prop */}
//           <div className='w-full border border-gray rounded-lg p-8 mt-4'>
//             <Address col={true} onSelect={handleSelectAddress} />
//           </div>
//         </div>

//         {/* Right div for CartWrapper */}
//         <div className='w-full md:w-1/2'>
//           <CartWrapper cartItems={items} showCheckOutButton={false} />
//           <Button className="mt-3 w-full" onClick={handleCheckout}>
//             CheckOut with Paypal
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Button } from '@/components/ui/button';
// import Address from '@/components/shopping-view/address';
// import CartWrapper from '@/components/shopping-view/cart-wrapper';
// import { createOrder } from '@/store/shop/order-slice'; // Import the createOrder action
// import AddressTile from '@/components/shopping-view/address-tile';
// import { fetchNearestBranch } from '@/store/shop/distance-slice';

// export default function ShoppingCheckout() {
//   const dispatch = useDispatch();

//   const [showAddressTile, setShowAddressTile] = useState(false);
//   const [selectedAddressId, setSelectedAddressId] = useState(null); 
//   const [selectedAddress, setSelectedAddress] = useState(null); 
//   const [shippingCost, setShippingCost] = useState(null); // Add state for shipping cost

//   const { items } = useSelector((state) => state.cart);
//   console.log("itemszzwwaaaasss",items)
//   const { user } = useSelector((state) => state.auth);
//   const userId = user?.id;

//   const handleAddAddress = () => {
//     setShowAddressTile(!showAddressTile);
//   };

//   const handleCloseAddress = () => {
//     setShowAddressTile(false);
//   };
//   const handleSelectAddress = async (addressId, addressObject) => {
//     setSelectedAddressId(addressId);
//     setSelectedAddress(addressObject);
  
//     // Calculate total weight before fetching the nearest branch
//     const totalWeight = items.reduce((total, item) => {
//       const itemWeight = Number(item.weight) || 0; // Convert weight to a number and use 0 as a fallback
//       const itemQuantity = Number(item.quantity) || 0; // Convert quantity to a number and use 0 as a fallback
//       return total + (itemWeight * itemQuantity); // Calculate total weight safely
//     }, 0);
  
//     console.log("totalWeightzztt", totalWeight); // This should now log a valid total weight
  
//     try {
//       const response = await dispatch(
//         fetchNearestBranch({
//           address: addressObject.address,
//           city: addressObject.city,
//           productWeight: totalWeight, // Pass total weight here
//         })
//       ).unwrap();
      
//       if (response && response.shippingCost) {
//         setShippingCost(response.shippingCost); // Set the shipping cost here
//         console.log("Shipping cost updated:", response.shippingCost);
//       } else {
//         console.error("Failed to get a valid shipping cost from response");
//       }
//     } catch (error) {
//       console.error("Error fetching nearest branch:", error);
//     }
//   };
  
  

  

//   const handleCheckout = async () => {
//     if (!selectedAddressId || !items.length) {
//       console.log("No address or items selected for checkout.");
//       return;
//     }
//     const calculateTotalPrice = () => {
//       const cartTotal = items.reduce((total, item) => {
//         const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
//         return total + priceToUse * item.quantity;
//       }, 0);
    
//       const finalTotal = cartTotal + shippingCost; // Include shipping cost
    
//       return finalTotal ? finalTotal.toFixed(2).toString() : "0.00";
//     };
//    const total=calculateTotalPrice();
// console.log("totallzz",total)
//     const addressInfo = {
//       addressId: selectedAddressId,
//       address: selectedAddress.address,
//       city: selectedAddress.city,
//       pinCode: selectedAddress.pinCode,
//       notes: selectedAddress.notes,
//     };

//     try {
//       const response = await dispatch(
//         createOrder({
//           items: items.map(item => ({
//             productId: item.productId,
//             title: item.title,
//             image: item.image,
//             price: item.price,
//             salePrice: item.salePrice,
//             quantity: item.quantity,
          
//           })),
//           userId,
//           addressInfo,
//           total
         
//         })
//       ).unwrap();

//       console.log('Order created successfully:', response);
//     } catch (error) {
//       console.error('Failed to create order:', error);
//     }
//   };

//   return (
//     <div className='w-full min-h-screen'>
//       <div className='h-[360px] w-full'>
//         <img
//           className='w-full h-full object-cover'
//           src='https://americantwoshot.com/wp-content/uploads/2021/12/starting-a-clothing-line.jpg'
//           alt='wardrobe'
//         />
//       </div>
//       <div className='flex p-1 md:p-20 flex-col md:flex-row '>
//         {/* Left div for AddressTile and Address, taking 50% width */}
//         <div className=' w-full md:w-1/2 pr-4'>
//           {/* Add Address button */}
//           <div className='flex justify-center'>
//             {!showAddressTile && (
//               <Button className="mt-3 mb-3" onClick={handleAddAddress}>
//                 Add Address
//               </Button>
//             )}
//           </div>

//           {/* Render AddressTile only when showAddressTile is true */}
//           {showAddressTile && (
//             <div className="relative border border-gray rounded-lg p-8">
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                 onClick={handleCloseAddress}
//               >
//                 &times; {/* This represents the close (X) icon */}
//               </button>
//               <AddressTile col={true} />
//             </div>
//           )}

//           {/* Address component with onSelect prop */}
//           <div className='w-full border border-gray rounded-lg p-8 mt-4'>
//             <Address col={true} onSelect={handleSelectAddress} />
//           </div>
//         </div>

//         {/* Right div for CartWrapper */}
//         <div className='w-full md:w-1/2'>
//           <CartWrapper cartItems={items} showCheckOutButton={false} />
//           <Button className="mt-3 w-full" onClick={handleCheckout}>
//             CheckOut with Paypal
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import Address from '@/components/shopping-view/address';
import CartWrapper from '@/components/shopping-view/cart-wrapper';
import { createOrder } from '@/store/shop/order-slice'; // Import the createOrder action
import AddressTile from '@/components/shopping-view/address-tile';
import { fetchNearestBranch } from '@/store/shop/distance-slice';
import { fetchCartItems } from '@/store/shop/cart-slice';

export default function ShoppingCheckout() {
  const dispatch = useDispatch();

  const [showAddressTile, setShowAddressTile] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null); 
  const [selectedAddress, setSelectedAddress] = useState(null); 
  const [shippingCost, setShippingCost] = useState(0); // Start with 0 as default for shipping cost

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId)); // Dispatch action to fetch cart items
    }
  }, [userId, dispatch]);

  const handleAddAddress = () => {
    setShowAddressTile(!showAddressTile);
  };

  const handleCloseAddress = () => {
    setShowAddressTile(false);
  };

  const handleSelectAddress = async (addressId, addressObject) => {
    setSelectedAddressId(addressId);
    setSelectedAddress(addressObject);

    // Calculate total weight before fetching the nearest branch
    const totalWeight = items.reduce((total, item) => {
      const itemWeight = Number(item.weight) || 0; // Convert weight to a number and use 0 as a fallback
      const itemQuantity = Number(item.quantity) || 0; // Convert quantity to a number and use 0 as a fallback
      return total + (itemWeight * itemQuantity); // Calculate total weight safely
    }, 0);

    console.log("Total weight of items:", totalWeight);

    try {
      const response = await dispatch(
        fetchNearestBranch({
          address: addressObject.address,
          city: addressObject.city,
          productWeight: totalWeight, // Pass total weight here
        })
      ).unwrap();
      
      if (response && response.shippingCost) {
        setShippingCost(response.shippingCost); // Set the shipping cost here
        console.log("Shipping cost updated:", response.shippingCost);
      } else {
        console.error("Failed to get a valid shipping cost from response");
      }
    } catch (error) {
      console.error("Error fetching nearest branch:", error);
    }
  };
  const calculateTotalPrice = () => {
    const cartTotal = items.reduce((total, item) => {
      const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
      return total + priceToUse * item.quantity;
    }, 0);
    
    // Ensure both cartTotal and shippingCost are numbers
    const finalCartTotal = Number(cartTotal) || 0;
    const finalShippingCost = Number(shippingCost) || 0;
  
    const finalTotal = finalCartTotal + finalShippingCost; // Sum them up safely
  
    // Return the final total as a fixed decimal string
    return finalTotal.toFixed(2).toString();
  };
  
  const handleCheckout = async () => {
    if (!selectedAddressId || !items.length) {
      console.log("No address or items selected for checkout.");
      return;
    }

    const total = calculateTotalPrice(); // Calculate total including shipping
    console.log("Total price including shipping:", total);

    const addressInfo = {
      addressId: selectedAddressId,
      address: selectedAddress.address,
      city: selectedAddress.city,
      pinCode: selectedAddress.pinCode,
      notes: selectedAddress.notes,
    };

    try {
      const response = await dispatch(
        createOrder({
          items: items.map(item => ({
            productId: item.productId,
            title: item.title,
            image: item.image,
            price: item.price,
            salePrice: item.salePrice,
            quantity: item.quantity,
          })),
          userId,
          addressInfo,
          total,  // Pass the total including shipping cost
        })
      ).unwrap();

      console.log('Order created successfully:', response);
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <div className='w-full min-h-screen'>
      <div className='h-[360px] w-full'>
        <img
          className='w-full h-full object-cover'
          src='https://americantwoshot.com/wp-content/uploads/2021/12/starting-a-clothing-line.jpg'
          alt='wardrobe'
        />
      </div>
      <div className='flex p-1 md:p-20 flex-col md:flex-row '>
        {/* Left div for AddressTile and Address, taking 50% width */}
        <div className=' w-full md:w-1/2 pr-4'>
          {/* Add Address button */}
          <div className='flex justify-center'>
            {!showAddressTile && (
              <Button className="mt-3 mb-3" onClick={handleAddAddress}>
                Add Address
              </Button>
            )}
          </div>

          {/* Render AddressTile only when showAddressTile is true */}
          {showAddressTile && (
            <div className="relative border border-gray rounded-lg p-8">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={handleCloseAddress}
              >
                &times; {/* This represents the close (X) icon */}
              </button>
              <AddressTile col={true} />
            </div>
          )}

          {/* Address component with onSelect prop */}
          <div className='w-full border border-gray rounded-lg p-8 mt-4'>
            <Address col={true} onSelect={handleSelectAddress} />
          </div>
        </div>

        {/* Right div for CartWrapper */}
        <div className='w-full md:w-1/2'>
          <CartWrapper cartItems={items} showCheckOutButton={false} />
          <Button className="mt-3 w-full" onClick={handleCheckout}>
            CheckOut with Paypal
          </Button>
        </div>
      </div>
    </div>
  );
}
